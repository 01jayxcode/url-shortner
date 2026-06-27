const jwt = require("jsonwebtoken");
const supabase = require("../config/supabase");

const findOrCreateUser = async (profile) => {
  const google_id = profile.id;
  const email = profile.emails[0].value;
  const name = profile.displayName;
  const avatar = profile.photos?.[0]?.value || null;
  const role = email === process.env.ADMIN_EMAIL ? "admin" : "user";

  // check if exists
  const { data: existing } = await supabase
    .from("users")
    .select("*")
    .eq("google_id", google_id)
    .maybeSingle();

  if (existing) return existing;

  // create new
  const { data: newUser, error } = await supabase
    .from("users")
    .insert({ google_id, email, name, avatar, role })
    .select()
    .single();

  if (error) throw error;
  return newUser;
};

const generateToken = (user) => {
  return jwt.sign(
    {
      user_id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      avatar: user.avatar,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
};

module.exports = { findOrCreateUser, generateToken };
