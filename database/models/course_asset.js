import mongoose from "mongoose";

if (!mongoose.models.Course_Asset) {
  const courseAssetSchema = new mongoose.Schema(
    {
      lecture_name: String,
      lecture_file: String,
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
    },
    {
      timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    }
  );

  courseAssetSchema.virtual("id", function () {
    return this._id;
  });

  let Course_Asset = mongoose.model("Course_Asset", courseAssetSchema);
}
let Course_Asset = mongoose.model("Course_Asset");
export default Course_Asset;
