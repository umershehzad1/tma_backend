import { Router } from "express";
// import { requireUser, validateRequest } from "../../middleware";
import {  validateRequest } from "../../middleware";
import { getUserData, updateUser, getAllUserData } from "../../controllers/user";
import { updateSchema } from "../../validation/user";

const userRouter = Router();

userRouter.patch("/", validateRequest(updateSchema), updateUser);
userRouter.get("/", getUserData);
userRouter.get("/get", getAllUserData);

export default userRouter;

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User
 */

/**
 * @swagger
 * /v1/user:
 *   get:
 *     summary: Get user information
 *     description: Logged in users can fetch only their own user information.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *
 *   patch:
 *     summary: Update  user
 *     description: Logged in users can only update their own information.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: fake name
 *     responses:
 *       "200":
 *         description: OK
 *
 */
