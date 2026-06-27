const supabase = require("../config/supabase");

const createShortUrl = async (
  short_code,
  long_url,
  uid = null,
  user_id = null,
) => {
  const { data, error } = await supabase
    .from("urls")
    .insert({ short_code, long_url, uid, user_id })
    .select()
    .single();
  if (error) throw error;
  return data;
};

const getUrlByCode = async (short_code) => {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("short_code", short_code)
    .maybeSingle();
  if (error) throw error;
  return data;
};

const incrementClicks = async (short_code) => {
  await supabase.rpc("increment_clicks", { code: short_code });
};

const getStats = async (short_code) => {
  const { data, error } = await supabase
    .from("urls")
    .select("short_code, long_url, clicks, created_at")
    .eq("short_code", short_code)
    .maybeSingle();
  if (error) throw error;
  return data;
};

module.exports = { createShortUrl, getUrlByCode, incrementClicks, getStats };
