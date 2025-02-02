import { NextRequest, NextResponse } from "next/server";
import Transaction, { ITransaction } from "@/models/model.transaction";
import { v4 as uuidv4 } from "uuid";
import connectDb from "@/lib/connectDb";

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const transactionData = await req.json();
    const user_id = req.headers.get("user_id");

    const newTransaction: ITransaction = new Transaction({
      id: uuidv4(),
      user_id: user_id,
      transaction_type: transactionData.transaction_type,
      amount: transactionData.amount,
      date: transactionData.date || new Date(),
      description: transactionData.description,
      party_name: transactionData.party_name,
    });

    await newTransaction.save();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to create transaction",
        error: error,
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
