"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axios from "axios";

const AddNew = () => {
  const [showAddNew, setShowAddNew] = useState(false);

  const [formData, setFormData] = useState({
    party_name: "",
    transaction_type: "",
    amount: 0,
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddTransaction = async () => {
    const newTransaction = {
      party_name: formData.party_name,
      transaction_type: formData.transaction_type,
      amount: formData.amount,
      description: formData.description,
    };

    console.log("From UI : ", newTransaction);
    try {
      const res = await axios.post("/api/transaction/save", newTransaction, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.status === 200) {
        toast.success("Transaction Added");
        return;
      }

      toast.error("Failed to add transaction");
    } catch (error) {
      console.log(error);
    }

    setShowAddNew(false);
    setFormData({
      party_name: "",
      transaction_type: "",
      amount: 0,
      description: "",
    });
  };

  return (
    <>
      <Button
        onClick={() => setShowAddNew(!showAddNew)}
        className="w-full sm:w-auto text-white py-2 px-4 rounded mb-8"
      >
        {showAddNew ? "Cancel" : "Add New Transaction"}
      </Button>

      {showAddNew && (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create Entry</CardTitle>
            <CardDescription>
              Add a new transaction to your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="party_name">Name</Label>
                  <Input
                    id="party_name"
                    name="party_name"
                    value={formData.party_name}
                    onChange={handleInputChange}
                    placeholder="Name of the party"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="transaction_type">Transaction Type</Label>
                  <Select
                    name="transaction_type"
                    value={formData.transaction_type}
                    onValueChange={(value) =>
                      handleInputChange({
                        target: { name: "transaction_type", value },
                      } as React.ChangeEvent<HTMLInputElement>)
                    }
                  >
                    <SelectTrigger id="transaction_type">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="receivable">Receivable</SelectItem>
                      <SelectItem value="payable">Payable</SelectItem>
                      <SelectItem value="lent">Lent</SelectItem>
                      <SelectItem value="borrowed">Borrowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="amount">Transaction Amount</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="Amount"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">Transaction Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter Description"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={() => setShowAddNew(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleAddTransaction}>Save</Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default AddNew;
