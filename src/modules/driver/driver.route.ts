import { Router } from "express";
import { checkAuth } from "../../middlewares/check-auth";
import { Role } from "../user/user.type";
import { driverController } from "./driver.controller";
import { validateRequest } from "../../middlewares/validation-request";
import { AddDriverInfoZodSchema } from "./driver.validation";

const router = Router();

router.post(
  "/add-information",
  validateRequest(AddDriverInfoZodSchema),
  checkAuth(Role.DRIVER, Role.ADMIN),
  driverController.addDriverInfo,
);

router.get("/all-drivers", checkAuth(Role.ADMIN), driverController.getAllDrivers);

router.patch("/approve/:id", checkAuth(Role.ADMIN), driverController.approveDriver);
router.patch("/suspend/:id", checkAuth(Role.ADMIN), driverController.suspendDriver);

export const driverRouters = router;
