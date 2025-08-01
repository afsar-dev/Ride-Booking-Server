import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { DriverStatus, IDriver } from "./driver.type";
import { User } from "../user/user.model";
import { Driver } from "./driver.model";
import { Role } from "../user/user.type";

export const driverService = {
  addDriverInfo: async (payload: IDriver) => {
    const { userId, licenseNumber } = payload;
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(StatusCodes.BAD_REQUEST, "User does not exist");
    }
    if (user.role !== Role.DRIVER) {
      throw new AppError(StatusCodes.BAD_REQUEST, "User role must be driver");
    }
    const license = await Driver.findOne({ licenseNumber });
    if (license) {
      throw new AppError(StatusCodes.BAD_REQUEST, "License already exist");
    }
    const driver = await Driver.create(payload);
    return driver;
  },

  approveDriver: async (driverId: string) => {
    const driver = await Driver.findById(driverId);
    if (!driver) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Driver not found");
    }

    driver.status = DriverStatus.Approved;
    await driver.save();

    return driver;
  },

  suspendDriver: async (driverId: string) => {
    const driver = await Driver.findById(driverId);
    if (!driver) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Driver not found");
    }

    driver.status = DriverStatus.Suspended;
    await driver.save();

    return driver;
  },

  getAllDrivers: async () => {
    const drivers = await Driver.find();
    const totalDrivers = await Driver.countDocuments();
    return {
      data: drivers,
      meta: {
        total: totalDrivers,
      },
    };
  },
};
