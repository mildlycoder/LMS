import jwt from "jsonwebtoken";
import { Course, User, Enrolment } from "database/models";
import mongoose from "mongoose";

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

    const enrolments = await Enrolment.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },

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
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course",
        },
      },
      {
        $unwind: {
          path: "$course",
        },
      },
      {
        $project: {
          user: { first_name: 1, last_name: 1, _id: 1 },
          course: { image: 1, title: 1, slug: 1, is_class: 1, _id: 1 },
        },
      },
    ]);
    console.log(enrolments);
    res.status(200).json({
      enrolments,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error_code: "enrolments",
      message: e.message,
    });
  }
};
