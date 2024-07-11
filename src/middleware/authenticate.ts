import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import  User  from "../../models"; // Adjust the import path based on your actual file structure
import dotenv from 'dotenv';
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "./catchAsyncErrors";

dotenv.config({ path: `${process.cwd()}/.env` });

declare global {
    namespace Express {
      interface Request {
        token?: string;
        user?: any; // Adjust this type according to your User model
        userId?: number | string; // Adjust this type according to your User model
      }
    }
  }
export const authenticate = catchAsyncErrors(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next(new ErrorHandler("Authentication Failed!", 401))
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
    const userExist = await User.findOne({ _id: decodedToken.userId });

    if (!userExist ) {
      return res.status(401).send({ error: "Authentication Failed!" });
    }

    req.token = token;
    req.user = userExist;
    req.userId = userExist._id;
    next();
  
});
