import mongoose from "mongoose";

const { Schema } = mongoose;

if (!mongoose.models.Course_Progress) {
  const courseProgressSchema = new Schema(
    {
      finished: Boolean,
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
      videoId: {
        type: Schema.Types.ObjectId,
        ref: "Video",
        required: true,
      },
    },
    {
      timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    }
  );

  courseProgressSchema.virtual("id", function () {
    return this._id;
  });

  let Course_Progress = mongoose.model("Course_Progress", courseProgressSchema);
}
let Course_Progress = mongoose.model("Course_Progress");
export default Course_Progress;
