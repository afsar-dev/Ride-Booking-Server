import mongoose, { Model } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser, Role } from "./user.type";
import { IMongooseMethod } from "../../types/method";

const userSchema = new mongoose.Schema<IUser, Model<IUser>, IMongooseMethod>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.RIDER,
    },
    isBlocked: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as Partial<IUser>;
  if (update.password) {
    const salt = await bcrypt.genSalt(12);
    update.password = await bcrypt.hash(update.password, salt);
    this.setUpdate(update);
  }
  next();
});

userSchema.method("comparePassword", async function (realPassword) {
  return await bcrypt.compare(realPassword, this.password);
});

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

export const User = mongoose.model("User", userSchema);
