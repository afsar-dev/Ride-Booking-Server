import { Router } from "express";
import { checkAuth } from "../../middlewares/check-auth";
import { Role } from "../user/user.type";
import { driverController } from "./driver.controller";
import { validateRequest } from "../../middlewares/validation-request";
import { AddDriverInfoZodSchema } from "./driver.validation";

const router = Router();

router.post(
  "/add-info",
  validateRequest(AddDriverInfoZodSchema),
  checkAuth(Role.DRIVER || Role.ADMIN),
  driverController.addDriverInfo,
);

router.get("/all-drivers", checkAuth(Role.ADMIN), driverController.getAllDrivers);

router.patch("/toggle-status/:id", checkAuth(Role.ADMIN), driverController.approveDriver);

export const driverRouters = router;
