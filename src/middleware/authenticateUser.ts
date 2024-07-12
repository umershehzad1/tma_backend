import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";
import ErrorHandler from "../util/errorHandler";
import { catchError } from "../util/handleError";
import { jwtConfig } from "../config/config";

interface AuthenticatedRequest extends Request {
  token: string;
  user: User; 
  userId: number; 
}

export const authenticate = catchError(async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next(new ErrorHandler("Authentication Failed!", 401));
  }
  const decodedToken = jwt.verify(token, jwtConfig.secret as string) as JwtPayload;
  const userExist = await User.findOne({ where: { id: decodedToken.userId } });
  if (!userExist) {
    return res.status(401).send({ error: "Authentication Failed!" });
  }
  req.token = token;
  req.user = userExist;
  req.userId = userExist.id;
  next();
});
