import mongoose from "mongoose";

if (!mongoose.models.Enrolment) {
  const enrolmentSchema = new mongoose.Schema(
    {
      bought_price: {
        type: Number,
        required: true,
      },
      payment_method: {
        type: String,
        required: true,
      },
      buyer_name: {
        type: String,
        required: true,
      },
      buyer_email: {
        type: String,
        required: true,
      },
      buyer_avatar: {
        type: String,
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
        enum: ["paid", "unpaid"],
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

  enrolmentSchema.virtual("id", function () {
    return this._id;
  });

  let Enrolment = mongoose.model("Enrolment", enrolmentSchema);
}
let Enrolment = mongoose.model("Enrolment");

export default Enrolment;
