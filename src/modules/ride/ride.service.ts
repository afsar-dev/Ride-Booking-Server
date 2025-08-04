import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { Ride } from "./ride.model";
import { IRide, RideStatus } from "./ride.type";
import { User } from "../user/user.model";
import { ObjectId } from "mongodb";

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

  getRiderHistory: async (riderId: string) => {
    const rides = await Ride.find({ riderId: riderId }).sort({ createdAt: -1 });
    const totalRides = rides.length;
    return {
      data: rides,
      meta: {
        total: totalRides,
      },
    };
  },

  getAvailableRides: async () => {
    const rides = await Ride.find({
      status: RideStatus.Requested,
      driverId: null,
    }).sort({ createdAt: -1 });
    const availableRides = rides.length;
    return {
      data: rides,
      meta: {
        total: availableRides,
      },
    };
  },

  requestRide: async (payload: Partial<IRide>, riderId: string) => {
    const rider = await User.findById(riderId);
    if (!rider) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Rider id is not registered");
    }
    const existingRide = await Ride.findOne({
      riderId: riderId,
      status: RideStatus.Requested,
    });

    if (existingRide) {
      throw new AppError(StatusCodes.CONFLICT, "You already have a pending ride request");
    }

    const ride = await Ride.create({ riderId, ...payload });

    return ride;
  },

  acceptRide: async (rideId: string, driverId: string) => {
    const ride = await Ride.findById(rideId);
    if (!ride) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Ride not found");
    }
    if (ride.status !== RideStatus.Requested) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Ride not found");
    }

    const updatedData = {
      driverId: new ObjectId(driverId),
      status: RideStatus.Accepted,
      timestamps: {
        acceptedAt: new Date(),
      },
    };

    const updatedRide = await Ride.findByIdAndUpdate(rideId, updatedData, { new: true });
    return updatedRide;
  },

  cancelRide: async (riderId: string) => {
    const rider = await User.findById(riderId);
    if (!rider) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Rider id is not registered");
    }
    const ride = await Ride.findOne({ riderId });
    if (!ride) {
      throw new AppError(StatusCodes.FORBIDDEN, "Ride not found");
    }

    if (ride.status === RideStatus.Cancelled) {
      throw new AppError(StatusCodes.FORBIDDEN, "Ride already canceled");
    }

    if (ride.status !== RideStatus.Requested) {
      throw new AppError(StatusCodes.CONFLICT, "Cannot cancel after driver accepts");
    }

    ride.status = RideStatus.Cancelled;
    await ride.save();

    return ride;
  },
};
