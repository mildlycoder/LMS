import { Category, Course } from "database/models";

export default async function handler(req, res) {
  const { slug } = req.query;
  try {
    const category = await Category.findOne({ slug }).lean(true);

    const courses = await Course.aggregate([
      { $match: { catId: category._id } },
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

    res.status(200).json({ courses: { courses } });
  } catch (e) {
    res.status(400).json({
      error_code: "get_category_by_id",
      message: e.message,
    });
  }
}
