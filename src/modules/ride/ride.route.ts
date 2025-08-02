import { Router } from "express";
import { checkAuth } from "../../middlewares/check-auth";
import { Role } from "../user/user.type";
import { rideController } from "./ride.controller";
import { validateRequest } from "../../middlewares/validation-request";
import { rideRequestValidationSchema } from "./ride.validation";

const router = Router();

router.get("/all-rides", checkAuth(Role.ADMIN), rideController.getAllRides);
router.post(
  "/request",
  validateRequest(rideRequestValidationSchema),
  checkAuth(Role.RIDER || Role.ADMIN),
  rideController.requestRide,
);

export const rideRouters = router;
