import mongoose, { Document, Schema } from "mongoose";

export interface IUSER extends Document {
  name: string;
  email: string;
  password: string;
}
export interface ICONTENT extends Document {
  title: string;
  link: string;
  createdAt: Date;
  type?: "youtube" | "twitter" | "linkedin" | "other";
   user: Schema.Types.ObjectId;
}
const userSchema = new Schema<IUSER>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
  },
  { timestamps: true } // adds createdAt + updatedAt
);

export const User = mongoose.model<IUSER>("User", userSchema);

const contentSchema = new Schema<ICONTENT>(
  {
    title: { type: String, required: true, trim: true },
    link: { type: String, required: true },
    type: {
      type: String,
      enum: ["youtube", "twitter", "document", "other"],
      default: "other",
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Content = mongoose.model<ICONTENT>("Content", contentSchema);

