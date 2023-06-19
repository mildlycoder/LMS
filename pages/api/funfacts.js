import { Course, User, Enrolment, Video, Course_Asset } from "database/models";

export default async function handler(req, res) {
  try {
    const students = await User.countDocuments({ role: "student" });

    const instructors = await User.countDocuments({ role: "instructor" });

    const courses = await Course.countDocuments({ approved: true });

    const enrolments = await Enrolment.countDocuments({});
    const earnings = await Enrolment.find({});

    let earningsTotal;
    if (earnings) {
      earningsTotal = earnings.reduce((acc, el) => {
        acc += el.bought_price;
        return acc;
      }, 0);

      earningsTotal = ((earningsTotal * 100) / 100).toFixed(2);
    }

    const videos = await Video.countDocuments({});
    const assets = await Course_Asset.countDocuments({});

    res.status(200).json({
      students,
      instructors,
      courses,
      enrolments,
      earningsTotal,
      videos,
      assets,
    });
  } catch (e) {
    res.status(400).json({
      error_code: "get_funfacts",
      message: e.message,
    });
  }
}
