import mongoose from "mongoose";

if (!mongoose.models.Coupon) {
  const couponSchema = new mongoose.Schema(
    {
      code: {
        type: String,
        required: true,
      },
      discount: {
        type: Number,
        required: true,
      },
      exp_date: {
        type: Date,
        required: true,
      },
      status: {
        type: Boolean,
        required: true,
      },
      deleted_at: {
        type: Date,
      },
      active_for_full_site: {
        type: Boolean,
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

  couponSchema.virtual("id", function () {
    return this._id;
  });

  let Coupon = mongoose.model("Coupon", couponSchema);
}
let Coupon = mongoose.model("Coupon");
export default Coupon;
