import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from "../../../db/models/index";
import dotenv from 'dotenv';

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

export const adminAuthenticate = async (req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ error: "Authentication Failed!" });
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
    const userExist = await User.findOne({ where: { id: decodeToken.id, role: decodeToken.role } });

    if (!userExist || userExist.role !== "admin") {
      return res.status(401).send({ error: "Authentication Failed!" });
    }

    req.token = token;
    req.user = userExist;
    req.userId = userExist.id; // Assuming `id` is the correct field for user ID

    next();
  } catch (error : any) {
    console.error(error.message);
    return res.status(401).send({ error: "Authentication Failed!" });
  }
};
