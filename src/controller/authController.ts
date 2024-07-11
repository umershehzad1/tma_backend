import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import admin from "../firebase/firebase";
import User from "../../db/models/user";
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
interface TokenInterface {
  id: number;
  role: string;
}

const generateToken = (payload: TokenInterface): string => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
    expiresIn: process.env.JWT_EXPIRES_IN as string,
  });
};

/*
path : https://localhost:4000/api/auth/sign-up
body : {
  email : password,
  password : password,
  contactNumber : contactNumber,
}
*/
export const signupWithGoogle = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorHandler(errors.array()[0].msg, 400));
    }
    
    const { token, name, role } = req.body;
    if (!token) {
      return next(new ErrorHandler("Provide token", 400));
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email } = decodedToken;
    if(!email){
      return next(new ErrorHandler("Email is required", 400));
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return next(new ErrorHandler("User already exists", 400));
    }
    const newUser  = await User.create({
      name,
      email,

      role: role || 'user',
      google_token: token,
    });

    if (!newUser) {
      return next(new ErrorHandler("Unable to create new user", 400));
    }
    const result = newUser.toJSON();
    return res.status(201).json({
      message: "User created successfully",
      data: result,
    });
  }
);

export const signInWithGoogle = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorHandler(errors.array()[0].msg, 400));
    }
    
    const idToken = req.body.token;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email } = decodedToken;

    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      return next(new ErrorHandler("User not found", 400));
    }

    const token = generateToken({ id: existingUser.id, role: existingUser.role });

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
    });
  }
);

// Signup with Credentials Endpoint
export const signupWithCredentials = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorHandler(errors.array()[0].msg, 400));
    }
    
    const { name, contactNumber, token, role } = req.body;
    if (!token) {
      return next(new ErrorHandler("Provide token", 400));
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email } = decodedToken;
    if(!email){
      return next(new ErrorHandler("Email is required", 400));
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const newUser = await User.create({
      name,
      email,
      role: role || 'user',
      phone: contactNumber,
    });

    if (!newUser) {
      return next(new ErrorHandler("Unable to create new user", 400));
    }

    const result = newUser.toJSON();
    // Ensure that deletedAt is a property in your User model or remove this line if not needed
    // delete result.deletedAt;

    return res.status(201).json({
      message: "User created successfully",
      data: result,
    });
  }
);

export const signInWithCredentials = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorHandler(errors.array()[0].msg, 400));
    }
    
    const { token } = req.body;
    if (!token) {
      return next(new ErrorHandler("Provide token", 400));
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email } = decodedToken;

    const userExist = await User.findOne({ where: { email } });
    if (!userExist) {
      return next(new ErrorHandler("User not found", 400));
    }

    const newToken = generateToken({ id: userExist.id, role: userExist.role });

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token: newToken,
    });
  }
);
