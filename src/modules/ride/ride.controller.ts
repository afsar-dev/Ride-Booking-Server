/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/send-response";
import { rideService } from "./ride.service";
import { StatusCodes } from "http-status-codes";

export const rideController = {
  getAllRides: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await rideService.getAllRides();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "All Rides Retrieved Successfully",
      data: result.data,
      meta: result.meta,
    });
  }),

  requestRide: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await rideService.requestRide(req.body);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Ride requested successfully",
      data: result,
    });
  }),
};
