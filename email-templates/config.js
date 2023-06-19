import AWS from "aws-sdk";

export const ses = new AWS.SES({
  accessKeyId: process.env.EMAIL_ACCESS_KEY,
  secretAccessKey: process.env.EMAIL_SECRET_KEY,
  region: process.env.EMAIL_REGION,
});
