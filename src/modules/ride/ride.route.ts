import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.type";
import { rideController } from "./ride.controller";
import { validateRequest } from "../../middlewares/validationRequest";
import { rideRequestValidationSchema } from "./ride.validation";
import { checkDriverApprove } from "../../middlewares/checkDriverApprove";
// import { param } from "express-validator";

const router = Router();

router.get("/all-rides", checkAuth(Role.ADMIN), rideController.getAllRides);
router.get("/me", checkAuth(Role.RIDER), rideController.getRiderHistory);
router.get(
  "/available",
  checkAuth(Role.DRIVER, Role.ADMIN),
  checkDriverApprove,
  rideController.getAvailableRides,
);

router.get(
  "/completed",
  checkAuth(Role.DRIVER),
  checkDriverApprove,
  rideController.getAvailableRides,
);

router.post(
  "/request",
  validateRequest(rideRequestValidationSchema),
  checkAuth(Role.RIDER),
  rideController.requestRide,
);
router.patch("/accept/:id", checkAuth(Role.DRIVER), checkDriverApprove, rideController.acceptRide);

router.patch(
  "/:id/status",
  checkAuth(Role.DRIVER),
  checkDriverApprove,
  rideController.updateRideStatus,
);

router.patch("/cancel", checkAuth(Role.RIDER, Role.DRIVER), rideController.cancelRide);

export const rideRouters = router;
