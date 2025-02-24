"use client";
import addTransaction from "@/app/actions/AddTransaction";
import { toast } from "react-toastify";
import { useState } from "react";

const AddTransaction = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clientAction = async (formData: FormData) => {
    setIsSubmitting(true); // Disable the button when the form is submitted

    try {
      const res = await addTransaction(formData);

      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Transaction added successfully");
      }
    } catch (error) {
      toast.error("An error occurred while adding the transaction");
    } finally {
      setIsSubmitting(false); // Re-enable the button after the request is complete
    }
  };

  return (
    <>
      <h3>Add transaction</h3>
      <form action={clientAction}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            id="text"
            name="text"
            placeholder="Enter text..."
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br /> (negative - expense, positive - income)
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="Enter amount..."
            step="0.01"
            required
          />
        </div>
        <button className="btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add transaction"}
        </button>
      </form>
    </>
  );
};

export default AddTransaction;