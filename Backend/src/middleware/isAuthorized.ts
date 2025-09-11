import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend Request type to allow custom properties
declare global {
  namespace Express {
    interface Request {
      id?: string;
      name?: string;
    }
  }
}

interface MyJwtPayload extends JwtPayload {
  id: string;
  name: string;
}

const secret = process.env.JWT_SECRET as string;

export const isAuthorized = async (
  req: Request,
  res: Response, 
  next: NextFunction
) => {
  try {
    const tokenHeader = req.headers["brainlytoken"];

    if (!tokenHeader || Array.isArray(tokenHeader)) {
      return res.status(401).json({
        message: "Token not provided or invalid format",
      });
    }

    const decoded = jwt.verify(tokenHeader, secret) as unknown as MyJwtPayload;

    req.id = decoded.id;
    req.name = decoded.name;

    next();
  } catch (err: any) {
    console.error("JWT verification error:", err);
    return res.status(403).json({
      message: "Token is invalid or expired",
      error: err.message,
    });
  }
};
