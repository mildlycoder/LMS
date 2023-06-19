import {
  Course,
  User,
  Category,
  Enrolment,
  Course_Asset,
} from "database/models";

export default async function handler(req, res) {
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
  const { slug } = req.query;
  try {
    const course = await Course.findOne({ slug: slug })
      .populate({
        path: "userId",
        select: "first_name last_name profile_photo bio",
      })
      .populate({
        path: "catId",
        select: "name slug",
      });
    // .populate({
    //   path: "enrolments",
    //   select: "_id",
    // })
    // .populate({
    //   path: "assets",
    //   select: "_id",
    // });

    res.status(200).json({
      course,
    });
  } catch (e) {
    res.status(400).json({
      error_code: "get_course",
      message: e.message,
    });
  }
};
