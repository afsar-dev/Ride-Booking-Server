import { z } from "zod";
import { Types } from "mongoose";
import { RideStatus } from "./ride.type";

export const rideValidationSchema = z.object({
  riderId: z.instanceof(Types.ObjectId, { message: "Invalid Rider ID" }),
  driverId: z.instanceof(Types.ObjectId, { message: "Invalid Driver ID" }),
  pickup: z.object({
    lat: z.number().optional(),
    lng: z.number().optional(),
    address: z.string().min(3, "Pickup address is required"),
  }),
  destination: z.object({
    lat: z.number().optional(),
    lng: z.number().optional(),
    address: z.string().min(1, "Destination address is required"),
  }),
  status: z.enum(Object.values(RideStatus)).optional().default(RideStatus.Requested),
  timestamps: z
    .object({
      requestedAt: z.date().optional(),
      acceptedAt: z.date().optional(),
      pickedUpAt: z.date().optional(),
      completedAt: z.date().optional(),
    })
    .optional(),
});
