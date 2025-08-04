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

  getRiderHistory: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const riderId = req.id;
    const result = await rideService.getRiderHistory(riderId);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Rides History Retrieved Successfully",
      data: result.data,
      meta: result.meta,
    });
  }),

  getAvailableRides: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await rideService.getAvailableRides();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "All Available Rides History Retrieved Successfully",
      data: result.data,
      meta: result.meta,
    });
  }),

  requestRide: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const riderId = req.id;
    const result = await rideService.requestRide(req.body, riderId);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Ride requested successfully",
      data: result,
    });
  }),

  acceptRide: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const driverId = req.id;
    const result = await rideService.acceptRide(req.params.id, driverId);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Ride accepted successfully",
      data: result,
    });
  }),

  cancelRide: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await rideService.cancelRide(req.params.id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Ride cancelled successfully",
      data: result,
    });
  }),
};
