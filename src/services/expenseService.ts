import axios from "axios";
import { Expense } from "../context/ExpenseContext";

const API_URL = "https://expense-tracker-server-h04m.onrender.com/api/expenses";

export const fetchExpenses = async (): Promise<Expense[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addExpense = async (expense: Expense): Promise<Expense> => {
  const response = await axios.post(API_URL, expense);
  return response.data;
};

export const editExpense = async (
  updatedExpense: Expense
): Promise<Expense> => {
  const response = await axios.put(
    `${API_URL}/${updatedExpense.id}`,
    updatedExpense
  );
  return response.data;
};

export const deleteExpense = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
