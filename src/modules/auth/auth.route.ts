import { Router } from "express";
import { authController } from "./auth.controller";
import { validateRequest } from "../../middlewares/validation-request";
import { CreateUserZodSchema } from "../user/user.validation";

const router = Router();

router.post("/register", validateRequest(CreateUserZodSchema), authController.registerUser);

router.post("/login", authController.login);

export const AuthRoutes = router;
