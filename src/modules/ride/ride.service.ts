import { Ride } from "./ride.model";

export const rideService = {
  getAllRides: async () => {
    const rides = await Ride.find();
    const totalRides = await Ride.countDocuments();
    return {
      data: rides,
      meta: {
        total: totalRides,
      },
    };
  },
};
