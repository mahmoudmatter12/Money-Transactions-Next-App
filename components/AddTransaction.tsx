"use client";
import addTransaction from "@/app/actions/AddTransaction";
import { toast } from "react-toastify";
import { useState } from "react";

interface TransactionResponse {
  error?: string;
  success?: boolean;
}

export const AddTransaction = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const clientAction = async (formData: FormData, form: HTMLFormElement) => {
    try {
      setIsSubmitting(true); // Disable the button when the form is submitted
      const res: TransactionResponse = await addTransaction(formData);

      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Transaction added successfully");
        form.reset(); // Reset the form after successful submission
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
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          const form = e.target as HTMLFormElement;
          clientAction(new FormData(form), form);
        }}
      >
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
        <button
          className={`btn ${isSubmitting ? "bg-red-500" : "bg-blue-300"}`}
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add transaction"}
        </button>
      </form>
    </>
  );
};