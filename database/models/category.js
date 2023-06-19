import mongoose from "mongoose";

if (!mongoose.models.Category) {
  const categorySchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      slug: {
        type: String,
        required: true,
        unique: true,
      },
    },
    {
      timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    }
  );
  categorySchema.virtual("id", function () {
    console.log(this);
    return this._id;
  });

  let Category = mongoose.model("Category", categorySchema);
}
let Category = mongoose.model("Category");

export default Category;
