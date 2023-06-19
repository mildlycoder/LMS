import Video from "database/models/video";

export default async function handler(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ message: "No autorization token" });
  }
  switch (req.method) {
    case "GET":
      await handleGet(req, res);
      break;
    case "DELETE":
      await handleDelete(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const handleGet = async (req, res) => {
  const { id } = req.query;
  try {
    const videos = await Video.find({ courseId: id }).sort({ short_id: 1 });

    res.status(200).json({ videos });
  } catch (e) {
    res.status(400).json({
      error_code: "get_course_videos",
      message: e.message,
    });
  }
};

const handleDelete = async (req, res) => {
  const { id } = req.query;
  try {
    const video = await Video.findByIdAndDelete(id);

    res.status(200).json({ message: "Video deleted successfully" });
  } catch (e) {
    res.status(400).json({
      error_code: "delete_video",
      message: e.message,
    });
  }
};
