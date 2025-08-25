import express, { Request, Response, NextFunction } from "express";
import { safeParse, success, z } from "zod";
import { issue } from "zod/v4/core/util.cjs";
export let signUpSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.email(),
  password: z.string().min(3).max(10),
});
export let signUpValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = signUpSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation Failed",
        errors: result.error.issues.map((issue) => issue.message),
      });
    } else {
      next();
    }
  } catch (err) {
    res.json({
      err: err,
    });
  }
};

let loginSchema = z.object({
  email: z.email(),
  password: z.string().min(3).max(10),
});
export let loginValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation Failed",
        errors: result.error.issues.map((issue) => issue.message),
      });
    } else {
      next();
    }
  } catch (err) {
    res.json({
      err: err,
    });
  }
};

export let contentSchema = z.object({
  title: z.string().min(3).max(1000),
  link: z.url(),
  type: z.string(),
});

export const contentValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = contentSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation Failed",
        errors: result.error.issues.map((issue) => issue.message),
      });
    } else {
      next();
    }
  } catch (err) {
    return res.json({
      error: err,
    });
  }
};
