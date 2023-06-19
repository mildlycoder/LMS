import Coupon from "database/models/coupon";

export default async function handler(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ message: "No autorization token" });
  }
  switch (req.method) {
    case "POST":
      await handlePostRequest(req, res);
      break;
    case "PUT":
      await handlePutRequest(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const handlePostRequest = async (req, res) => {
  const { coupon, discount } = req.body;

  try {
    const couponExist = await Coupon.findOne({
      code: coupon,
    });

    if (couponExist) {
      return res.status(422).json({
        message: "Coupon with the same code already exists",
      });
    }

    if (!coupon) {
      return res.status(422).json({
        message: "Coupon code must be provided",
      });
    }

    if (discount == 0) {
      return res.status(422).json({
        message: "Discount must be provided",
      });
    }

    const newcoupon = await Coupon.create({
      code: coupon,
      discount: discount,
    });

    res.status(200).json({
      message: "New coupon code added",
      coupon: newcoupon,
    });
  } catch (e) {
    res.status(400).json({
      error_code: "create_coupon",
      message: e.message,
    });
  }
};

const handlePutRequest = async (req, res) => {
  const { couponId } = req.body;
  try {
    const coupons = await Coupon.find().select("_id");

    let couponIds = [];
    coupons.forEach((cp) => {
      couponIds.push(cp._id);
    });

    Coupon.update({ _id: couponIds }, { active_for_full_site: false });

    Coupon.update({ _id: couponId }, { active_for_full_site: true });

    res.status(200).json({
      message: "Coupon code activated for all courses",
    });
  } catch (e) {
    res.status(400).json({
      error_code: "coupon_for_all_courses",
      message: e.message,
    });
  }
};
