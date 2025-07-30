import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { User } from "../user/user.model";
import { IUser } from "../user/user.type";

export const authService = {
  createUser: async (payload: IUser) => {
    const { email } = payload;
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      throw new AppError(StatusCodes.BAD_REQUEST, "User Already Exist");
    }

    const user = User.create(payload);
    return user;
  },
};
