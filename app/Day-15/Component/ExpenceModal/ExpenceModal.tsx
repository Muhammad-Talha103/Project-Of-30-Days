'use client'
import { useEffect, useState } from "react";
import { ModalExpense, ModalProps } from "../ExpenceType/types";

const ExpenseModal = ({ isOpen, onClose, AddExpense, isEditing, currentExpense, onEditSave }: ModalProps) => {
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState<number | "">(""); 
  const [date, setDate] = useState("");

  useEffect(() => {
    if (isEditing && currentExpense) {
      setCategory(currentExpense.category);
      setNote(currentExpense.note);
      setAmount(currentExpense.amount);
      setDate(currentExpense.date);
    } else {
      resetForm(); 
    }
  }, [isEditing, currentExpense]);

  const resetForm = () => {
    setAmount(0);
    setCategory("");
    setNote("");
    setDate("");
  };

  const handleAddExpense = () => {
    if (amount && note && category && date) {
      const newExpense: ModalExpense = {
        id: isEditing && currentExpense ? currentExpense.id : `${Date.now()}`, 
        category,
        note,
        amount: Number(amount),
        date,
      };

      if (isEditing && onEditSave) {
        onEditSave(newExpense); 
      } else {
        AddExpense(newExpense); 
      }
      onClose();
      resetForm();
    } else {
      alert("Please fill in all fields to save the expense.");
    }
  };

  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-8 bg-white rounded-md shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Expense</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Amount</label>
          <input
            type="number"
            name="amount"
            value={amount === "" ? "" : Number(amount)}
            onChange={(e) =>
              setAmount(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="Enter amount"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Note</label>
          <textarea
            name="note"
            value={note.length > 100 ? note.substring(0, 100) + "..." : note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="Enter a note"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={
              date === "" ? "" : new Date(date).toISOString().split("T")[0]
            }
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleAddExpense}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
           {isEditing?"Save Changes":"Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseModal;
