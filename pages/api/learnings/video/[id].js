import { Video, Course_Progress } from "@/database/models";
import { bunnyStream } from "pages/api/bunny";

export default async function handler(req, res) {
  const { id, userId, courseId } = req.query;
  // console.log("###", req.query);
  try {
    const video = await Video.findById(id);
    console.log(id, video);
    if (video) {
      const progress = await Course_Progress.findOne({
        userId: userId,
        courseId: courseId,
        videoId: id,
      });
      if (!progress) {
        await Course_Progress.create({
          finished: true,
          userId,
          courseId,
          videoId: id,
        });
      }
    }

    const response = await bunnyStream.getVideo(video.video);
    console.log(response);
    res.status(200).json({
      video,
    });
  } catch (e) {
    res.status(400).json({
      error_code: "get_videos",
      message: e.message,
    });
  }
}
