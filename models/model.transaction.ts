import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface ITransaction extends mongoose.Document {
  id: string;
  user_id: string;
  transaction_type: string;
  amount: number;
  date: Date;
  description: string;
  party_name: string;
}

const transactionSchema = new Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    transaction_type: {
      type: String,
      enum: ["receivable", "payable", "lent", "borrowed"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      required: true,
    },
    party_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);

export default Transaction;
