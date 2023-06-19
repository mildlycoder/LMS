import { Course } from "@/database/models";

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
  const { page, limit, short, search } = req.query;
  const pageNumber = parseInt(page);
  const getRealNumber = isNaN(pageNumber) ? 0 : pageNumber;
  const coursesOffset = limit * (getRealNumber - 1);
  const LIMIT = parseInt(limit);
  try {
    let totalPages;
    totalPages = await Course.countDocuments({ approved: true });

    const courses = await Course.find({
      $and: [
        {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { short_desc: { $regex: search, $options: "i" } },
          ],
        },
        { approved: true },
      ],
    })
      .sort(short ? { latest_price: short } : { created_at: -1 })
      .populate("userId", "first_name last_name profile_photo")
      // .populate("enrolments", "_id")
      .skip(coursesOffset)
      .limit(LIMIT);

    const coursesCount = await Course.countDocuments({
      $and: [
        {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { short_desc: { $regex: search, $options: "i" } },
          ],
        },
        { approved: true },
      ],
    });

    totalPages = Math.ceil(totalPages / limit);

    res.status(200).json({
      courses,
      totalPages,
      coursesCount,
    });
  } catch (e) {
    res.status(400).json({
      error_code: "get_all_courses",
      message: e.message,
    });
  }
};
