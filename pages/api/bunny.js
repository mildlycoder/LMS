import { BunnyCdnStream } from "bunnycdn-stream";

export const bunnyStream = new BunnyCdnStream({
  videoLibrary: process.env.BUNNY_VIDEO_LIBRARY_ID,
  apiKey: process.env.BUNNY_STREAM_API_KEY,
});
