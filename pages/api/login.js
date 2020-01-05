import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";

connectDb();

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    // 1) check if a users exists w/ the provided email
    const user = await User.findOne({ email }).select("+password");
    // 2) --if not, return error
    if (!user) {
      return res.status(404).send("No user exists with that email");
    }
    // 3) check to see if users' password matches the one in db
    const passwordsMatch = await bcrypt.compare(password, user.password);
    // 4) --if so, generate a token
    if (passwordsMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
      });
      res.status(200).json(token);
    } else {
      res.status(401).send("Passwords do not match");
    }
    // 5) send that token to the client
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in user");
  }
};
