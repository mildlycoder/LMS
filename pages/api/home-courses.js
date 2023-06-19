import { Course, User, Enrolment, Category } from "database/models";

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
  try {
    const courses = await Course.aggregate([
      { $match: { in_home_page: true, approved: true } },
      { $sample: { size: 4 } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
        },
      },
      {
        $lookup: {
          from: "enrolments",
          localField: "_id",
          foreignField: "courseId",
          as: "enrolments",
        },
      },
      {
        $project: {
          title: 1,
          slug: 1,
          duration: 1,
          lessons: 1,
          image: 1,
          access_time: 1,
          user: {
            first_name: 1,
            last_name: 1,
            profile_photo: 1,
          },
          enrolments: {
            $size: "$enrolments",
          },
        },
      },
    ]);

    const categories = await Category.aggregate([{ $sample: { size: 12 } }]);
    res.status(200).json({
      courses,
      categories,
    });
  } catch (e) {
    console.log("Error", e);
    res.status(400).json({
      error_code: "get_my_courses",
      message: e.message,
    });
  }
};
