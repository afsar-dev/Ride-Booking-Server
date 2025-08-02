import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { Ride } from "./ride.model";
import { IRide, RideStatus } from "./ride.type";
import { User } from "../user/user.model";

export const rideService = {
  getAllRides: async () => {
    const rides = await Ride.find();
    const totalRides = await Ride.countDocuments();
    return {
      data: rides,
      meta: {
        total: totalRides,
      },
    };
  },

  requestRide: async (payload: Partial<IRide>) => {
    const rider = await User.findById(payload.riderId);
    if (!rider) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Rider id is not registered");
    }
    const existingRide = await Ride.findOne({
      riderId: payload.riderId,
      status: RideStatus.Requested,
    });

    if (existingRide) {
      throw new AppError(StatusCodes.CONFLICT, "You already have a pending ride request");
    }

    const ride = await Ride.create(payload);

    return ride;
  },
};
