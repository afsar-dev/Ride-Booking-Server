/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import { driverService } from "./driver.service";
import { sendResponse } from "../../utils/send-response";
import { StatusCodes } from "http-status-codes";
import { DriverStatus } from "./driver.type";

export const driverController = {
  addDriverInfo: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await driverService.addDriverInfo(req.body);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Driver information added",
      data: result,
    });
  }),
  approveDriver: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await driverService.approveDriver(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: result.status === DriverStatus.Approved ? StatusCodes.OK : StatusCodes.FORBIDDEN,
      message:
        result.status === DriverStatus.Approved ? DriverStatus.Approved : DriverStatus.Suspended,
      data: result,
    });
  }),
  getAllDrivers: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await driverService.getAllDrivers();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "All Drivers Retrieved Successfully",
      data: result.data,
      meta: result.meta,
    });
  }),
};
