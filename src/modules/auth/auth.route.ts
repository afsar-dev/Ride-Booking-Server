import { Router } from "express";
import { authController } from "./auth.controller";
import { validateRequest } from "../../middlewares/validation-request";
import { CreateUserZodSchema } from "../user/user.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(CreateUserZodSchema),
  authController.createUser
);

router.post("/login", authController.createUser);

export const AuthRoutes = router;
