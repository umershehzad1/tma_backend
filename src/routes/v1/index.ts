import { Router } from "express";

import authRouter from "./authRoute";
import docsRouter from "./docsRoute";
import userRouter from "./userRoutes";
import adminCategoriesRouter from "./adminCategoriesRoutes";
import adminProductRoutes from "./adminProductRoutes";

const appRouter = Router();

// all routes
const appRoutes = [
  {
    path: "/auth",
    router: authRouter,
  },
  {
    path: "/admin/categories",
    router: adminCategoriesRouter,
  },
  {
    path: "/admin/products",
    router: adminProductRoutes,
  },
  {
    path: "/dashboard",
    router: userRouter,
  },
  {
    path: "/docs",
    router: docsRouter,
  },
];

appRoutes.forEach(route => {
  appRouter.use(route.path, route.router);
});

export default appRouter;
