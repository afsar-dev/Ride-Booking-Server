import { Router } from "express";
import { checkAuth } from "../../middlewares/check-auth";
import { Role } from "../user/user.type";
import { rideController } from "./ride.controller";

const router = Router();

router.get("/all-rides", checkAuth(Role.ADMIN), rideController.getAllRides);

export const rideRouters = router;