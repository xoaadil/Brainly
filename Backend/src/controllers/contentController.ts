import { Request, Response, NextFunction } from "express";
import { Content, User } from "../db";

// CREATE
export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, type, link } = req.body;
    const userId = req.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const newPost = await Content.create({
      title,
      type,
      link,
      user: user._id, // better to just store ID
    });

    return res.status(201).json({
         success: true,
      message: "post has been made",
      newPost,
    });
  } catch (err) {
    return res.status(500).json({ message: "server side error", error: err });
  }
};

// EDIT
export const edit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, type, link } = req.body;
    const userId = req.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized – no user ID found" });
    }

    const contentId = req.params.id;
    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ message: "post not found" });
    }

    // check ownership
    const isOwner = content.user.toString() === userId.toString();
    if (!isOwner) {
      return res.status(401).json({ message: "You are not authorized to edit this post" });
    }

    content.title = title;
    content.link = link;
    content.type = type;
    await content.save();

    return res.status(200).json({
         success: true,
      message: "post has been edited",
      content,
    });
  } catch (err) {
    return res.status(500).json({ message: "server side error", error: err });
  }
};

// DELETE
export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized – no user ID found" });
    }

    const contentId = req.params.id;
    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ message: "post not found" });
    }

    const isOwner = content.user.toString() === userId.toString();
    if (!isOwner) {
      return res.status(401).json({ message: "You are not authorized to delete this post" });
    }

    await content.deleteOne();

    return res.status(200).json({ message: "post deleted successfully", success: true, });
  } catch (err) {
    return res.status(500).json({ message: "server side error", error: err });
  }
};

// GET ALL CONTENT BY USER
export const getAllByUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized – no user ID found" });
    }

    const contents = await Content.find({ user: userId }).sort({ createdAt: -1 });

    return res.status(200).json({ contents });
  } catch (err) {
    return res.status(500).json({ message: "server side error", error: err, success: true, });
  }
};

// GET ALL CONTENT BY TYPE
export const getAllByType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type } = req.params;
    const contents = await Content.find({ type }).sort({ createdAt: -1 });

    return res.status(200).json({ contents });
  } catch (err) {
    return res.status(500).json({ message: "server side error", error: err, success: true, });
  }
};
