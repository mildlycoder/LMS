import mongoose from "mongoose";

if (!mongoose.models.Testimonial) {
  const testimonialSchema = new mongoose.Schema(
    {
      image: { type: String },
      name: { type: String, required: true },
      designation: { type: String, required: true },
      description: { type: String, required: true },
    },
    {
      timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    }
  );

  testimonialSchema.virtual("id", function () {
    return this._id;
  });
  testimonialSchema.virtual("image_url").get(function () {
    return `${process.env.CLOUDFRONT_URL}/${this.image}`;
  });

  let Testimonial = mongoose.model("Testimonial", testimonialSchema);
}

let Testimonial = mongoose.model("Testimonial");
export default Testimonial;
