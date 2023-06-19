const mongoose = require("mongoose");
const { Schema } = mongoose;

if (!mongoose.models.Favourite) {
  const favouriteSchema = new Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      courseId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Course",
      },
    },
    {
      timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    }
  );

  favouriteSchema.virtual("id", function () {
    return this._id;
  });

  let Favourite = mongoose.model("Favourite", favouriteSchema);
}
let Favourite = mongoose.model("Favourite");
module.exports = Favourite;
