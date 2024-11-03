import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  fetchExpenses,
  addExpense as apiAddExpense,
  editExpense as apiEditExpense,
  deleteExpense as apiDeleteExpense,
} from "../services/expenseService";

// Definición del tipo de gasto
export interface Expense {
  id: number;
  amount: number;
  category: string;
  date: string;
  description?: string;
}

// Definición del contexto
interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  editExpense: (updatedExpense: Expense) => void;
  deleteExpense: (id: number) => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

// Proveedor del contexto
export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Cargar los gastos desde la API al inicializar el componente
  useEffect(() => {
    const loadExpenses = async () => {
      const expensesFromApi = await fetchExpenses();
      setExpenses(expensesFromApi);
    };
    loadExpenses();
  }, []);

  // Función para agregar un gasto
  const addExpense = async (expense: Expense) => {
    const newExpense = await apiAddExpense(expense);
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  // Función para editar un gasto existente
  const editExpense = async (updatedExpense: Expense) => {
    const editedExpense = await apiEditExpense(updatedExpense);
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === editedExpense.id ? editedExpense : expense
      )
    );
  };

  // Función para eliminar un gasto
  const deleteExpense = async (id: number) => {
    await apiDeleteExpense(id);
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  };

  return (
    <ExpenseContext.Provider
      value={{ expenses, addExpense, editExpense, deleteExpense }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

// Hook para acceder al contexto de gastos
export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (!context)
    throw new Error("useExpenseContext debe usarse dentro de un SProvider");
  return context;
};
