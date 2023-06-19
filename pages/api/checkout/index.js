import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
import { Enrolment, Instructor_Earning, Course } from "database/models";
import { calculateCartTotal } from "@/utils/calculateCartTotal";
import { checkoutConfirmation } from "email-templates/checkout-confirmation";

const stripeSecret = new Stripe(process.env.STRIPE_KEY);
export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await handlePostRequest(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const handlePostRequest = async (req, res) => {
  const { cartItems, userId, buyer_name, buyer_email, buyer_avatar } = req.body;

  const { stripeTotal } = calculateCartTotal(cartItems);
  try {
    for (const cart of cartItems) {
      console.log(cart);
      await Enrolment.create({
        bought_price: cart.price,
        payment_method: "Card",
        buyer_name: buyer_name,
        buyer_email: buyer_email,
        buyer_avatar: buyer_avatar,
        userId: userId,
        courseId: cart.id,
        status: "paid",
      });

      const courseInstructor = await Course.findOne(
        {
          _id: cart.id,
        },
        { userId: 1 }
      );

      await Instructor_Earning.create({
        earnings: cart.price,
        userId: courseInstructor.userId,
        courseId: cart.id,
      });
    }

    console.log(cartItems);

    checkoutConfirmation(cartItems, buyer_name, buyer_email);
    // await stripeSecret.charges.create(
    //   {
    //     amount: stripeTotal,
    //     currency: "inr",
    //     source: "tok_mastercard",
    //     receipt_email: buyer_email,
    //     description: `Checkout | ${buyer_email} | ${userId}`,
    //   },
    //   {
    //     idempotencyKey: uuidv4(),
    //   }
    // );

    res.status(200).json({
      message: "Enroled successfully.",
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error_code: "create_enroled",
      message: e.message,
    });
  }
};
