import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/send-response";
import { StatusCodes } from "http-status-codes";

export const authController = {
  createUser: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await authService.createUser(req.body);
      sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "User Created Successfully",
        data: result,
      });
    }
  ),
};
