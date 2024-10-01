"use client";

import React, { useState } from "react";
import { ModalExpense } from "../ExpenceType/types";
import ExpenseModal from "../ExpenceModal/ExpenceModal";

export default function ExpenceList() {
  const [expenses, setExpenses] = useState<ModalExpense[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<ModalExpense | null>(null);
  const [total, setTotal] = useState(0);

  const addExpense = (expense: ModalExpense) => {
    setExpenses([...expenses, expense]);
    setTotal(total + expense.amount);
  };

  const onClose = () => {
    setIsOpen(false);
    setIsEditing(false);
    setSelectedExpense(null);
  };

  const editExpense = (expense: ModalExpense) => {
    setIsEditing(true);
    setSelectedExpense(expense);
    setIsOpen(true);
  };

  const updateExpense = (updatedExpense: ModalExpense) => {
    const oldExpense = expenses.find((expense) => expense.id === updatedExpense.id);

    if (oldExpense) {
      const updatedTotal = total - oldExpense.amount + updatedExpense.amount;
      setTotal(updatedTotal);
    }

    setExpenses(
      expenses.map((expense) => (expense.id === updatedExpense.id ? updatedExpense : expense))
    );

    onClose();
  };

  const deleteExpense = (expenseId: string) => {
    const deletedExpense = expenses.find((expense) => expense.id === expenseId);

    if (deletedExpense) {
      setTotal(total - deletedExpense.amount); 
    }

    setExpenses(expenses.filter((expense) => expense.id !== expenseId));
  };
  return (
    <div className="container mx-auto  px-4 sm:px-6 lg:px-8">
  <h1 className="text-2xl sm:text-3xl w-full md:text-4xl font-bold mb-4 text-center">
    Expense Tracker App
  </h1>
  <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
    <h1 className="text-lg text-center sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-0">
      Expense List
    </h1>
    <button
      onClick={() => setIsOpen(true)}
      className="bg-blue-500 hover:bg-blue-600  text-white py-2 px-4 rounded-lg w-full sm:w-auto"
    >
      Add Expense
    </button>
  </div>

      <ExpenseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      AddExpense={addExpense}
      isEditing={isEditing}
      currentExpense={selectedExpense}
      onEditSave={updateExpense}
      
      />

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border border-gray-300">ID</th>
            <th className="px-4 py-2 border border-gray-300">Amount</th>
            <th className="px-4 py-2 border border-gray-300">Note</th>
            <th className="px-4 py-2 border border-gray-300">Category</th>
            <th className="px-4 py-2 border border-gray-300">Date</th>
            <th className="px-4 py-2 border border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense: ModalExpense) => (
            <tr key={expense.id} className="border-t text-center">
              <td className="px-4 py-2 border border-gray-300">{expense.id}</td>
              <td className="px-4 py-2 border border-gray-300">
                {expense.amount}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {expense.note}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {expense.category}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {expense.date}
              </td>
              <td className="px-4 py-2 border border-gray-300">
              <button
                  onClick={() => editExpense(expense)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteExpense(expense.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2 className="text-2xl font-semibold text-right mt-2">Total Expenses: {total}</h2>
      </div>
    </div>
  );
}
