import { JwtPayload } from "jsonwebtoken";
import { User } from "./user.model";
import { IUser, Role } from "./user.type";
import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { httpMessages } from "../../constants/http-messages";

export const userService = {
  getAllUsers: async () => {
    const users = await User.find();
    const totalUsers = await User.countDocuments();
    return {
      data: users,
      meta: {
        total: totalUsers,
      },
    };
  },
  updateUser: async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {
    const ifUserExist = await User.findById(userId);
    if (!ifUserExist) {
      throw new AppError(StatusCodes.NOT_FOUND, "User Not Found");
    }
    if (payload.role) {
      if (decodedToken.role === Role.DRIVER || decodedToken.role === Role.RIDER) {
        throw new AppError(StatusCodes.FORBIDDEN, httpMessages.ACCESS);
      }

      if (payload.role === Role.ADMIN) {
        throw new AppError(StatusCodes.FORBIDDEN, httpMessages.ACCESS);
      }
    }
    if (payload.isBlocked) {
      if (decodedToken.role === Role.DRIVER || decodedToken.role === Role.RIDER) {
        throw new AppError(StatusCodes.FORBIDDEN, httpMessages.ACCESS);
      }
    }

    const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {
      new: true,
      runValidators: true,
    });

    return newUpdatedUser;
  },
  blockUser: async (userId: string) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, "User Not Found");
    }
    user.isBlocked = !user.isBlocked;
    await user.save();

    return user;
  },
};
