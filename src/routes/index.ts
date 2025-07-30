import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";

export const v1router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => {
  v1router.use(route.path, route.route);
});
