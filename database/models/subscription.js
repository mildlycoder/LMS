import mongoose from "mongoose";

if (!mongoose.models.Subscription) {
  const subscriptionSchema = new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        unique: true,
      },
      active: {
        type: Boolean,
        default: true,
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

  subscriptionSchema.virtual("id", function () {
    return this._id;
  });
  let Subscription = mongoose.model("Subscription", subscriptionSchema);
}
let Subscription = mongoose.model("Subscription");
export default Subscription;
