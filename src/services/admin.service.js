const supabase = require("../config/supabase");

const getGlobalStats = async () => {
  const { count: totalLinks } = await supabase
    .from("urls")
    .select("*", { count: "exact", head: true });

  const { data: clickData } = await supabase.from("urls").select("clicks");

  const totalClicks =
    clickData?.reduce((sum, row) => sum + (row.clicks || 0), 0) || 0;

  const { count: totalUsers } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });

  return { totalLinks, totalClicks, totalUsers };
};

const getAllLinks = async (page = 1, limit = 20) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("urls")
    .select("*, users(name, email, avatar)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;
  return { data, total: count, page, limit };
};

const getAllUsers = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("id, name, email, avatar, role, created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;

  // get link count + total clicks per user
  const enriched = await Promise.all(
    data.map(async (user) => {
      const { data: links } = await supabase
        .from("urls")
        .select("clicks")
        .eq("user_id", user.id);

      const totalClicks =
        links?.reduce((sum, l) => sum + (l.clicks || 0), 0) || 0;

      return { ...user, linkCount: links?.length || 0, totalClicks };
    }),
  );

  return enriched;
};

const deleteLink = async (short_code) => {
  const { error } = await supabase
    .from("urls")
    .delete()
    .eq("short_code", short_code);

  if (error) throw error;
  return { deleted: true };
};

module.exports = { getGlobalStats, getAllLinks, getAllUsers, deleteLink };
