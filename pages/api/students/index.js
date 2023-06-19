import User from "database/models/user";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await handleGet(req, res);
      break;

    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const handleGet = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).sort({
      created_at: -1,
    });

    res.status(200).json({ students });
  } catch (e) {
    res.status(400).json({
      error_code: "get_students",
      message: e.message,
    });
  }
};
