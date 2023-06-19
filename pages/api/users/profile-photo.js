import jwt from "jsonwebtoken";
import User from "database/models/user";
import { getUploadSignedUrl } from "../s3";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ message: "No autorization token" });
  }
  switch (req.method) {
    case "GET":
      await getProfilePhotoUrl(req, res);
      break;
    case "PUT":
      await userProfilePhoto(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
};

const getProfilePhotoUrl = async (req, res) => {
  const { image_type } = req.query;

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const key = `user/${userId}`;
    const signedUrl = await getUploadSignedUrl(key, image_type);

    await User.findByIdAndUpdate(userId, { profile: key });

    await res.status(200).json({
      message: "Profile photo upload.",
      signedUrl,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error_code: "update_user_image",
      message: e.message,
    });
  }
};

const userProfilePhoto = async (req, res) => {
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const updateUser = await User.findById(userId);

    console.log(updateUser, updateUser.profile_photo);

    const edmy_users_token = jwt.sign(
      {
        userId: updateUser.id,
        first_name: updateUser.first_name,
        last_name: updateUser.last_name,
        email: updateUser.email,
        role: updateUser.role,
        profile_photo: updateUser.profile_photo,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Profile photo updated.",
      edmy_users_token,
    });
  } catch (e) {
    res.status(400).json({
      error_code: "update_user_avatar",
      message: e.message,
    });
  }
};
