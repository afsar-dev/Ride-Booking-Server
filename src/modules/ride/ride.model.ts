import mongoose from "mongoose";
import { IRide, RideStatus } from "./ride.type";

const rideSchema = new mongoose.Schema<IRide>(
  {
    riderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    pickup: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: { type: String, required: true },
    },
    destination: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: { type: String, required: true },
    },
    status: {
      type: String,
      enum: Object.values(RideStatus),
      default: RideStatus.Requested,
    },
    timestamps: {
      requestedAt: { type: Date, default: Date.now },
      acceptedAt: Date,
      pickedUpAt: Date,
      completedAt: Date,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Ride = mongoose.model<IRide>("Ride", rideSchema);
