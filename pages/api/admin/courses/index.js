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
    let courses = await Course.find({ approved: true })
      .sort({ created_at: -1 })
      .populate({
        path: "userId",
        select: "first_name last_name profile_photo",
      })
      .populate({
        path: "catId",
        select: "name slug",
      });
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
      error_code: "get_courses",
      message: e.message,
    });
  }
};

const handlePut = async (req, res) => {
  try {
    const { courseId, apply } = req.body;
    if (apply) {
      await Course.updateOne(
        { _id: courseId },
        {
          $set: {
            in_home_page: true,
            in_home_page_set_at: Date.now(),
          },
        }
      );

      res.status(200).json({ message: "This course set to homepage" });
    } else {
      await Course.updateOne(
        { _id: courseId },
        {
          $set: {
            in_home_page: false,
            in_home_page_set_at: null,
          },
        }
      );

      res.status(200).json({ message: "This course unset to homepage" });
    }
  } catch (e) {
    res.status(400).json({
      error_code: "course_set_to_home",
      message: e.message,
    });
  }
};
