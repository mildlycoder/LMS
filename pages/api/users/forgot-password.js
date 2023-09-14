import User from "database/models/user";
import { resetPasswordEmail } from "email-templates/account-confirmation";
import { v4 as uuidv4 } from "uuid";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await sentForgotPasswordLink(req, res);
      break;
    case "POST":
      await verifyForgotPasswordLink(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
  }
};

const sentForgotPasswordLink = async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res.status(422).json({ message: `Email is incorrect` });
    }

    const reset_token = uuidv4();

    user.reset_password_token = reset_token;
    user.reset_password_send_at = new Date();
    await user.save();

    await resetPasswordEmail(user);

    return res.status(200).json({
      message: "Token sent on email",
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error_code: "email_confirmation",
      message: e.message,
    });
  }
};

const verifyForgotPasswordLink = async (req, res) => {
  const { token, password } = req.body;
  try {
    const user = await User.findOne({
      reset_password_token: token,
    });

    if (!user) {
      return res.status(422).json({ message: `Invalid token` });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    user.password = passwordHash;
    await user.save();

    return res.status(200).json({
      message: "Password reset",
    });
  } catch (e) {
    res.status(400).json({
      error_code: "email_confirmation",
      message: e.message,
    });
  }
};
