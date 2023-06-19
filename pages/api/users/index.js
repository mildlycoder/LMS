import { User } from "@/database/models";

export default async function handler(req, res) {
  try {
    const users = await User.find({})
      .select("first_name last_name email")
      .sort({ created_at: -1 })
      .limit(100);

    res.status(200).json({ users });
  } catch (e) {
    res.status(400).json({
      error_code: "get_users",
      message: e.message,
    });
  }
}
