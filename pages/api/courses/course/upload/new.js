import jwt from "jsonwebtoken";
import Video from "database/models/video";
import { bunnyStream } from "pages/api/bunny";
import { getUploadSignedUrl } from "pages/api/s3";

export default async function handler(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ message: "No autorization token" });
  }
  switch (req.method) {
    case "GET":
      await handleGet(req, res);
      break;
    case "POST":
      await handlePost(req, res);
      break;
    case "DELETE":
      await handleDelete(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const handlePost = async (req, res) => {
  const {
    group_name,
    title,
    thumb,
    video,
    image_type,
    video_length,
    is_preview,
    short_id,
    courseId,
  } = req.body;
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const response = await bunnyStream.createDirectUpload({ title });

    const newVideo = await Video.create({
      group_name,
      title,
      video: response.headers.VideoId,
      video_length,
      is_preview,
      short_id,
      courseId,
      userId,
    });

    console.log(newVideo);

    let thumbSignedUrl;
    if (image_type) {
      console.log(newVideo.thumb);
      const key = `thumb/${newVideo._id}`;
      thumbSignedUrl = await getUploadSignedUrl(key, image_type);
      newVideo.thumbnail = key;
      await newVideo.save();
    }
    // await bunnyStream.setThumbnail(response.headers.VideoId, newVideo.thumb);

    res.status(200).json({
      message: "Video Uploaded Successfully.",
      headers: response.headers,
      thumbSignedUrl,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error_code: "upload_video",
      message: e.message,
    });
  }
};
