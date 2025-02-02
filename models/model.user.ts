import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IUser extends mongoose.Document {
  id: string;
  email: string;
  password: string;
  username: string;
  is_verified?: boolean;
  created_at: Date;
  refresh_token?: string;
  password_reset_token?: string;
}

const userSchema = new Schema(
  {
    id: { type: String, default: uuidv4(), required: true },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    refresh_token: {
      type: String,
    },
    password_reset_token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
