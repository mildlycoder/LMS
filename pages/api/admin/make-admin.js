import { User } from "database/models";

export default async function handler(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ message: "No autorization token" });
  }
  switch (req.method) {
    case "GET":
      await handleGet(req, res);
      break;
    case "PUT":
      await handlePut(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const handleGet = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).sort({ created_at: -1 });

    res.status(200).json({ admins });
  } catch (e) {
    res.status(400).json({
      error_code: "get_courses_for_approve",
      message: e.message,
    });
  }
};

const handlePut = async (req, res) => {
  try {
    const { userId, admin } = req.body;

    if (admin) {
      await User.updateOne({ _id: userId }, { $set: { role: "admin" } });

      res.status(200).json({ message: "This user now admin access" });
    } else {
      await User.updateOne({ _id: userId }, { $set: { role: "student" } });

      res.status(200).json({ message: "Removed from admin" });
    }
  } catch (e) {
    res.status(400).json({
      error_code: "make_admin",
      message: e.message,
    });
  }
};
