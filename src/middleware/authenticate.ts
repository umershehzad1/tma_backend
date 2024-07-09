// import { Request, Response, NextFunction } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { User, UserDocument } from "../db/models"; // Adjust the import path based on your actual file structure
// import dotenv from 'dotenv';

// dotenv.config({ path: `${process.cwd()}/.env` });

// interface AuthRequest extends Request {
//   token?: string;
//   user?: UserDocument;
//   userId?: string;
// }

// export const authenticate = async (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//       return res.status(401).send({ error: "Authentication Failed!" });
//     }

//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
//     const userExist = await User.findOne({ _id: decodedToken.userId });

//     if (!userExist ) {
//       return res.status(401).send({ error: "Authentication Failed!" });
//     }

//     req.token = token;
//     req.user = userExist;
//     req.userId = userExist._id;
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(401).send({ error: "Authentication Failed!" });
//   }
// };
