import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../utils/send-response";
import { Request, Response } from "express";
import { httpMessages } from "../constants/http-messages";

export const notFound = (req: Request, res: Response) => {
  sendResponse(res, {
    statusCode: StatusCodes.NOT_FOUND,
    success: false,
    message: httpMessages.NOT_FOUND,
  });
};
