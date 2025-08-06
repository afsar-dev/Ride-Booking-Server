/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

export const authController = {
  registerUser: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await authService.registerUser(req.body);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "User Created Successfully",
      data: result,
    });
  }),
  login: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await authService.login(res, req.body);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User Logged In Successfully",
      data: result,
    });
  }),
};
