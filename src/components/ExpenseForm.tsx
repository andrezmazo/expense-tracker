import React, { useState } from "react";
import { useExpenseContext } from "../context/ExpenseContext";
import "./ExpenseForm.css";
import Toast from "../components/Toast";

interface ExpenseFormProps {
  initialExpense?: {
    id: number;
    amount: number;
    category: string;
    date: string;
    description?: string;
  };
  onSubmit: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  initialExpense,
  onSubmit,
}) => {
  const [amount, setAmount] = useState(initialExpense?.amount || 0);
  const [category, setCategory] = useState(initialExpense?.category || "");
  const [date, setDate] = useState(initialExpense?.date || "");
  const [description, setDescription] = useState(
    initialExpense?.description || ""
  );
  const { expenses, addExpense } = useExpenseContext();
  const [showToast, setShowToast] = useState<{
    visible: boolean;
    type: "create" | "edit" | "delete";
    amount?: number;
    category?: string;
  }>({ visible: false, type: "create" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que el monto sea mayor a cero
    if (amount <= 0) {
      setErrorMessage("El monto debe ser mayor a cero.");
      return;
    } else {
      setErrorMessage(""); // Limpiar el mensaje de error si el monto es válido
    }

    const newExpense = {
      id: expenses.length + 1,
      amount,
      category,
      date,
      description,
    };

    try {
      addExpense(newExpense);
      onSubmit(); // Llama a la función onSubmit pasada como prop
      setShowToast({
        visible: true,
        type: "create",
        amount: newExpense.amount,
        category: newExpense.category,
      });
      setTimeout(() => setShowToast({ visible: false, type: "create" }), 3000); // Oculta el toast después de 3 segundos
      setAmount(0);
      setCategory("");
      setDate("");
      setDescription("");
    } catch (error) {
      console.error("Error al agregar el gasto:", error);
    }
  };

  return (
    <div>
      <Toast
        visible={showToast.visible}
        type={showToast.type}
        amount={showToast.amount}
        category={showToast.category}
        onClose={() => setShowToast({ visible: false, type: showToast.type })}
      />
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="form-container card p-3">
        <h4>Añadir Nuevo Gasto</h4>
        <div className="mb-3">
          <label>Monto del Gasto</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min="0"
            required
          />
        </div>
        <div className="mb-3">
          <label>Categoría</label>
          <select
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Selecciona una categoría</option>
            <option value="Comida">Comida</option>
            <option value="Transporte">Transporte</option>
            <option value="Entretenimiento">Entretenimiento</option>
            <option value="Otros">Otros</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Fecha</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Descripción (opcional)</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar Gasto
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
