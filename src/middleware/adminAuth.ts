import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";
import ErrorHandler from "../util/errorHandler";
import { jwtConfig } from "../config/config";

interface AuthenticatedRequest extends Request {
  token: string | undefined;
  user?: User;
  userId: number | undefined;
}

export const adminAuthenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) : Promise<void> => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next(new ErrorHandler("Authentication Failed!", 401));
    }
    try {
    const decodedToken = jwt.verify(
      token,
      jwtConfig.secret as string
    ) as JwtPayload;
    const userExist = await User.findOne({
      where: { id: decodedToken.id, role: decodedToken.role },
    });

    if (!userExist || userExist.role !== "admin") {
      return next(new ErrorHandler("Authentication Failed!", 401));
    }
    req.token = token;
    req.user = userExist;
    req.userId = userExist.id;
    next();
   } catch (error) {
    console.log("ERRRRRRor : ", error);
      return next(new ErrorHandler("Authentication Failed!", 401));
   }
  };
