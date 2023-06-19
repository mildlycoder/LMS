import mongoose from "mongoose";

if (!mongoose.models.Partner) {
  const partnerSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      partner_image: {
        type: String,
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

  partnerSchema.virtual("id", function () {
    return this._id;
  });

  let Partner = mongoose.model("Partner", partnerSchema);
}
let Partner = mongoose.model("Partner");
export default Partner;
