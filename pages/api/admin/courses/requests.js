import { Course, User, Category, Video } from "database/models";

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
    let courses = await Course.find({ approved: false })
      .sort({ created_at: -1 })
      .populate("userId", ["first_name", "last_name", "profile_photo"])
      .populate("catId", ["name", "slug"]);
    courses = JSON.parse(JSON.stringify(courses));
    for (let i = 0; i < courses.length; i++) {
      const video = await Video.find({ courseId: courses[i]._id })
        .lean(true)
        .select({ title: 1 });
      courses[i].videos = video;
    }
    res.status(200).json({ courses });
  } catch (e) {
    res.status(400).json({
      error_code: "get_courses_for_approve",
      message: e.message,
    });
  }
};

const handlePut = async (req, res) => {
  try {
    const { courseId, approved } = req.body;
    // console.log(courseId);

    if (approved) {
      await Course.findOneAndUpdate({ _id: courseId }, { approved: true });

      res.status(200).json({ message: "Published course" });
    } else {
      const course = await Course.findByIdAndDelete(courseId);
      res.status(200).json({ message: "Course Deleted" });
    }
  } catch (e) {
    res.status(400).json({
      error_code: "approve_courses",
      message: e.message,
    });
  }
};
