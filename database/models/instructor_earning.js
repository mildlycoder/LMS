import mongoose from "mongoose";

if (!mongoose.models.Instructor_Earning) {
  const instructorEarningSchema = new mongoose.Schema(
    {
      earnings: {
        type: Number,
        required: true,
      },
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
      status: {
        type: String,
        enum: ["due", "paid", "cancelled"],
        default: "due",
      },
    },
    {
      timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    }
  );

  instructorEarningSchema.virtual("id", function () {
    return this._id;
  });

  let Instructor_Earning = mongoose.model(
    "Instructor_Earning",
    instructorEarningSchema
  );
}
let Instructor_Earning = mongoose.model("Instructor_Earning");

export default Instructor_Earning;
