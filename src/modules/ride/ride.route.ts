import { Router } from "express";
import { checkAuth } from "../../middlewares/check-auth";
import { Role } from "../user/user.type";
import { rideController } from "./ride.controller";
import { validateRequest } from "../../middlewares/validation-request";
import { rideRequestValidationSchema } from "./ride.validation";
import { checkDriverApprove } from "../../middlewares/checkDriverApprove";

const router = Router();

router.get("/all-rides", checkAuth(Role.ADMIN), rideController.getAllRides);
router.get("/me", checkAuth(Role.RIDER, Role.ADMIN), rideController.getRiderHistory);
router.get(
  "/available",
  checkAuth(Role.DRIVER, Role.ADMIN),
  checkDriverApprove,
  rideController.getAvailableRides,
);

router.post(
  "/request",
  validateRequest(rideRequestValidationSchema),
  checkAuth(Role.RIDER || Role.ADMIN),
  rideController.requestRide,
);
router.patch(
  "/accept/:id",
  checkAuth(Role.DRIVER, Role.ADMIN),
  checkDriverApprove,
  rideController.acceptRide,
);

router.patch("/cancel/:id", checkAuth(Role.RIDER, Role.ADMIN), rideController.cancelRide);

export const rideRouters = router;