import jwt from "jsonwebtoken";
import User from "../db/models/index";
import admin from "../firebase/firebase";
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
interface tokenInterface {
  id: string;
  role : string;
}
const generateToken = (payload : tokenInterface) => {
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
export const signupWithGoogle = async (req: Request, res: Response ): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { token, name, role } = req.body;
    if (!token) {
      return res.status(400).json({
        message: "Please provide a token",
      });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email } = decodedToken;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const newUser = await User.create({
      name,
      email,
      role: role || 'user',
      google_token: token,
    });

    if (!newUser) {
      return res.status(400).json({
        message: "Unable to create new user",
      });
    }

    const result = newUser.toJSON();
    delete result.deletedAt;
    return res.status(201).json({
      message: "User created successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
};

export const signInWithGoogle = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const idToken = req.body.token;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email } = decodedToken;

    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const token = generateToken({ id: existingUser.id, role: existingUser.role });
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token: token,
    });
  } catch (error: any) {
    console.error("Google Sign-In Error:", error);
    return res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
};

// Signup with Credentials Endpoint
export const signupWithCredentials = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, contactNumber, token, role } = req.body;
    if (!token) {
      return res.status(400).json({
        message: "Please provide a token",
      });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email } = decodedToken;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const newUser = await User.create({
      name,
      email,
      role: role || 'user',
      phone: contactNumber,
    });

    if (!newUser) {
      return res.status(400).json({
        message: "Unable to create new user",
      });
    }

    const result = newUser.toJSON();
    delete result.deletedAt;
    return res.status(201).json({
      message: "User created successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
};
export const signInWithCredentials = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({
        message: "Please provide a token",
      });
    }
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email } = decodedToken;
    const userExist = await User.findOne({
      where: {
        email,
      },
    });

    if (!userExist) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const generateNewToken = generateToken({ id: userExist.id, role: userExist.role });
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: generateNewToken,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
};



