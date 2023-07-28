import axios from "axios";
import { google } from "googleapis";
import jwt from "jsonwebtoken";

import { User } from "@/database/models";

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL || "http://localhost:3000/google/auth"
);

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await getAuthLink(req, res);
      break;
    case "POST":
      await googleUserLoginHandler(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const getAuthLink = async (req, res) => {
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  const redirectURL = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: scopes,
  });

  return res.json({
    isSuccess: true,
    message: "GOOGLE_AUTH_KEY",
    data: {
      redirectURL,
    },
  });
};

export const googleUserLoginHandler = async (req, res) => {
  try {
    const { code } = req.query;
    const data = await getGoogleUser(code);
    console.log(data);
    const { email, name } = data;

    let user = await findUserByEmail(email);

    if (user && user.authType === "email") {
      return res
        .status(400)
        .json({ message: "User Account linked with email and password" });
    }

    if (user && user.authType !== "google") {
      return res
        .status(400)
        .json({ message: `User have account with ${user.authType}` });
    }

    if (!user) {
      user = await User.create({
        first_name: name,
        email: email,
        authType: "google",
        email_confirmed: true,
        email_confirmed_at: new Date(),
        status: true,
        is_profile_public: true,
      });
    }

    const edmy_users_token = jwt.sign(
      {
        userId: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        profile_photo: user.profile_photo,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      message: "Registration Successful!",
      edmy_users_token,
    });
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      error_code: "create_user",
      message: e.message,
    });
  }
};

async function getGoogleUser(code) {
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    const googleUser = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.id_token}`,
        },
      }
    );
    return googleUser.data;
  } catch (error) {
    console.log(error);
    throw new Error("Invalid Token");
  }
}

async function findUserByEmail(email) {
  return await User.findOne({ email });
}
