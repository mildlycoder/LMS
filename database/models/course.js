import mongoose from "mongoose";
import Video from "./video";
const { Schema } = mongoose;

if (!mongoose.models.Course) {
  const CourseSchema = new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      slug: {
        type: String,
        required: true,
      },
      short_desc: {
        type: String,
        required: true,
      },
      overview: {
        type: String,
      },
      latest_price: {
        type: Number,
        required: true,
      },
      before_price: {
        type: Number,
        required: true,
      },
      lessons: {
        type: String,
        required: true,
      },
      duration: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        // required: true,
      },
      access_time: {
        type: String,
        enum: ["Lifetime", "Three Months", "Six Months", "1 Year"],
        default: "Lifetime",
      },
      requirements: {
        type: String,
      },
      what_you_will_learn: {
        type: String,
      },
      who_is_this_course_for: {
        type: String,
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      catId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
      approved: {
        type: Boolean,
        default: false,
        required: true,
      },
      in_home_page: {
        type: Boolean,
        default: false,
        required: true,
      },
      in_home_page_set_at: {
        type: Date,
        required: false,
      },
      is_class: {
        type: Boolean,
        required: true,
      },
    },
    {
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
      },
      toJSON: {
        virtuals: true,
      },
      toObject: { virtuals: true },
    }
  );

  CourseSchema.virtual("id", function () {
    return this._id;
  });
  CourseSchema.virtual("user").get(function () {
    return this.userId;
  });
  CourseSchema.virtual("category").get(function () {
    return this.catId;
  });

  let Course = mongoose.model("Course", CourseSchema);
}
let Course = mongoose.model("Course");
export default Course;
