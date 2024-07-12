
import User from "../models/User";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { catchError } from "../util/handleError";
import ErrorHandler from "../util/errorHandler";
import admin from "../firebase/firebase";
import {jwtConfig} from "../config/config";

interface TokenInterface {
  id?: number;
  role?: "admin" | "user" | "wholeseller";

}
// const omitData = ["password"];
const generateToken = (payload: TokenInterface) => {
  return jwt.sign(payload, jwtConfig.secret as string);
};
/*
path : http://localhost:4000/api/v1/auth/signupWithGoogle
method : POST

*/
export const signupWithGoogle = catchError(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, name, role } = req.body;
  if (!token) {
    return next(new ErrorHandler("Provide token", 400));
  }
  const decodedToken = await admin.auth().verifyIdToken(token);
  const { email } = decodedToken;
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return next(new ErrorHandler("User already exists", 400));
  }
  const newUser = await User.create({
    name,
    email,
    role: role || "user",
    google_token: token,
  });
  if (!newUser) {
    return next(new ErrorHandler("Unable to create new user", 400));
  }
  const result = newUser.toJSON();
  delete result.deletedAt;
  return res.status(201).json({
    message: "User created successfully",
    data: result,
  });
});
/*
path : http://localhost:4000/api/v1/auth/signinWithGoogle
method : POST

*/
export const signInWithGoogle = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
   
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
/*
path : http://localhost:4000/api/v1/auth/signupWithCredentials
method : POST

*/
export const signupWithCredentials = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, contactNumber, token, role } = req.body;
    if (!token) {
      return next(new ErrorHandler("Provide token", 400));
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email } = decodedToken;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return next(new ErrorHandler("User already exists", 400));
    }
    const newUser = await User.create({
      name,
      email,
      role: role || "user",
      phone: contactNumber,
    });
    if (!newUser) {
      return next(new ErrorHandler("Unable to create new user", 400));
    }

    const result = newUser.toJSON();
    delete result.deletedAt;

    return res.status(201).json({
      message: "User created successfully",
      data: result,
    });
  }
);
/*
path : http://localhost:4000/api/v1/auth/signinWithCredentials
method : POST

*/
export const signInWithCredentials = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
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
