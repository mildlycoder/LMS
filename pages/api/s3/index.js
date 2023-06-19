import User from "database/models/user";
import fs from "fs";
import S3 from "aws-sdk/clients/s3";
import { config } from "process";

const s3Client = new S3({
  region: process.env.AWS_S3_REGION,
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY,
});

export const getUploadSignedUrl = async (
  key,
  ContentType = "application/octet-stream"
) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    ContentType,
    ACL: "private",
    Expires: 3 * 60, // 3 minutes
  };
  const signedUrl = s3Client.getSignedUrl("putObject", params);
  return signedUrl;
};
