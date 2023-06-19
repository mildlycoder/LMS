import mongoose from "mongoose";
if (!mongoose.models.Video) {
  const videoSchema = new mongoose.Schema(
    {
      group_name: { type: String },
      title: { type: String },
      thumbnail: { type: String },
      video: { type: String },
      video_length: { type: Number },
      is_preview: { type: Boolean },
      short_id: { type: Number },
      assets_zip: { type: String },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
    },
    {
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
      },
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    }
  );

  videoSchema.virtual("id", function () {
    return this._id;
  });
  videoSchema.virtual("thumb").get(function () {
    return `${process.env.CLOUDFRONT_URL}/thumb/${this._id}`;
  });
  let Video = mongoose.model("Video", videoSchema);
}
let Video = mongoose.model("Video");
export default Video;
