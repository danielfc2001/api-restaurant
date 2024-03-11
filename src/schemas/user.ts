import mongoose, { Model } from "mongoose";

interface IUser {
  username: string;
  email: string;
  password: string;
  id: string;
  role: string;
}

type UserModel = Model<IUser>;

const userSchema = new mongoose.Schema<IUser, UserModel>(
  {
    username: {
      type: String,
      require: "Username must be required.",
      unique: true,
    },
    email: {
      type: String,
      require: "Email must be required.",
      unique: true,
    },
    password: {
      type: String,
      require: "Password must be required.",
    },
    id: {
      type: String,
      require: "Id must be required.",
    },
    role: {
      type: String,
      require: "Role must be required.",
    },
  },
  {
    timestamps: true,
  }
);

export const userModel = mongoose.model<IUser, UserModel>("users", userSchema);
