import jwt from "jsonwebtoken";
import { Course, User, Favourite, Enrolment } from "database/models";

export default async function handler(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ message: "No autorization token" });
  }
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const handleGetRequest = async (req, res) => {
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    console.log(userId);
    const courses = await Favourite.find({ userId: userId })
      .sort({
        created_at: -1,
      })
      .populate({
        path: "courseId",
        populate: {
          path: "userId",
          select: "first_name last_name profile_photo",
        },
      })
      .populate("courseId.enrolments", "id");

    return res.status(200).json({
      courses,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error_code: "get_my_courses",
      message: e.message,
    });
  }
};
