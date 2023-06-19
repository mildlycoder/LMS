import { slugify } from "@/utils/auth";
import Testimonial from "database/models/testimonial";
import { getUploadSignedUrl } from "../s3";

export default async function handler(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ message: "No autorization token" });
  }
  switch (req.method) {
    case "GET":
      await testimonialById(req, res);
      break;
    case "POST":
      await createTestimonial(req, res);
      break;
    case "PUT":
      await updateTestimonial(req, res);
      break;
    case "DELETE":
      await handleDelete(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const testimonialById = async (req, res) => {
  const { testId } = req.query;
  try {
    const testimonial = await Testimonial.findById(testId);

    res.status(200).json({ testimonial });
  } catch (e) {
    res.status(400).json({
      error_code: "get_testimonial_by_id",
      message: e.message,
    });
  }
};

const createTestimonial = async (req, res) => {
  const { image, image_type, name, designation, description } = req.body;

  try {
    const newcreateTestimonial = await Testimonial.create({
      name,
      designation,
      description,
    });

    let signedUrl;
    if (image) {
      const key = `testimonial/${newcreateTestimonial._id}`;
      signedUrl = await getUploadSignedUrl(key, image_type);
      newcreateTestimonial.image = key;
      await newcreateTestimonial.save();
    }

    res.status(200).json({
      message: "New Testimonial added",
      testimonial: newcreateTestimonial,
      signedUrl,
    });
  } catch (e) {
    res.status(400).json({
      error_code: "create_testimonial",
      message: e.message,
    });
  }
};

const updateTestimonial = async (req, res) => {
  try {
    const { testId, image, image_type, name, designation, description } =
      req.body;

    await Testimonial.updateOne(
      { _id: testId },
      {
        name,
        designation,
        description,
      }
    );
    let signedUrl;
    if (image) {
      const key = `testimonial/${testId._id}`;
      signedUrl = await getUploadSignedUrl(key, image_type);
    }
    res.status(200).json({
      message: "Testimonial updated.",
      signedUrl,
    });
  } catch (e) {
    res.status(400).json({
      error_code: "update_testimonial",
      message: e.message,
    });
  }
};

const handleDelete = async (req, res) => {
  const { testId } = req.query;
  // console.log(testId);
  try {
    const testi = await Testimonial.findByIdAndDelete(testId);

    res.status(200).json({ message: "Testimonial deleted successfully." });
  } catch (e) {
    res.status(400).json({
      error_code: "delete_restimonial",
      message: e.message,
    });
  }
};
