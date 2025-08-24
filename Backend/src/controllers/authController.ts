import { Response, Request, NextFunction } from "express";
import { User } from "../db";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv"
let sec : string = process.env.JWT_SECRET as string;
dotenv.config();
export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("jwt is there "+sec);
    const { name, email, password } = req.body;
console.log({ name, email, password });
    let already = await User.findOne({ email: email });

    if (already) {
      return res.json({
        message: "Email is already registered",
      });
    }
     else {
  console.log("Entered in else");

  let hashpass = await bcrypt.hash(password, 5);
  let user = await User.create({
    name,
    email,
    password: hashpass,
  });

  console.log("User created:", user);

  if (!sec) {
    throw new Error("JWT_SECRET is not defined");
  }

  let token = jwt.sign(
    { id: user._id as string , name: user.name },
    sec,
    { expiresIn: "1h" }
  );

  return res.json({
    message: "Signup successful",
    token,
    userdetail: {
      name: user.name,
      email: user.email,
    },
  });
}

  } catch (err: any) {
  console.error("Error in signup:", err); // real error in console
  return res.status(500).json({
    message: "Server side error",
    error: err.message || err
  });
}

};
