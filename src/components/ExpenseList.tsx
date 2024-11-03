import React, { useState } from "react";
import { useExpenseContext, Expense } from "../context/ExpenseContext";
import Toast from "../components/Toast";
import "./ExpenseList.css";

interface ExpenseListProps {
  filters: {
    category?: string;
    startDate?: string;
    endDate?: string;
  };
}

const ExpenseList: React.FC<ExpenseListProps> = ({ filters }) => {
  const { expenses, editExpense, deleteExpense } = useExpenseContext();
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editedExpense, setEditedExpense] = useState<Expense | null>(null);
  const [showToast, setShowToast] = useState<{
    visible: boolean;
    type: "create" | "edit" | "delete";
    amount?: number;
    category?: string;
  }>({ visible: false, type: "create" });

  // Filtrar y ordenar los gastos basados en los filtros
  const filteredExpenses = expenses.filter((expense) => {
    const matchCategory = filters.category
      ? expense.category === filters.category
      : true;
    const matchStartDate = filters.startDate
      ? new Date(expense.date) >= new Date(filters.startDate)
      : true;
    const matchEndDate = filters.endDate
      ? new Date(expense.date) <= new Date(filters.endDate)
      : true;
    return matchCategory && matchStartDate && matchEndDate;
  });

  const handleEdit = (expense: Expense) => {
    setEditMode(expense.id);
    setEditedExpense({ ...expense }); // Copia completa del gasto
  };

  const handleSave = () => {
    if (editedExpense) {
      setShowToast({
        visible: true,
        type: "edit",
        amount: editedExpense.amount,
        category: editedExpense.category,
      });
      setTimeout(() => setShowToast({ visible: false, type: "edit" }), 3000);
      editExpense(editedExpense);
      setEditMode(null);
    }
  };

  const handleDelete = (id: number) => {
    deleteExpense(id);
    setShowToast({
      visible: true,
      type: "delete",
    });
    setTimeout(() => setShowToast({ visible: false, type: "delete" }), 3000);
  };

  return (
    <div className="table-container">
      <Toast
        visible={showToast.visible}
        type={showToast.type}
        amount={showToast.amount}
        category={showToast.category}
        onClose={() => setShowToast({ visible: false, type: showToast.type })}
      />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Monto</th>
            <th>Categoría</th>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center">
                No hay gastos, añada un gasto desde el formulario.
              </td>
            </tr>
          ) : (
            filteredExpenses.map((expense) => (
              <tr key={expense.id}>
                <td>
                  {editMode === expense.id ? (
                    <input
                      className="form-control"
                      type="number"
                      value={editedExpense?.amount || ""}
                      onChange={(e) =>
                        setEditedExpense((prev) => ({
                          ...prev!,
                          amount: Number(e.target.value),
                        }))
                      }
                    />
                  ) : (
                    expense.amount
                  )}
                </td>
                <td>
                  {editMode === expense.id ? (
                    <select
                      className="form-control"
                      value={editedExpense?.category || ""}
                      onChange={(e) =>
                        setEditedExpense((prev) => ({
                          ...prev!,
                          category: e.target.value,
                        }))
                      }
                    >
                      <option value="">Selecciona una categoría</option>
                      <option value="Comida">Comida</option>
                      <option value="Transporte">Transporte</option>
                      <option value="Entretenimiento">Entretenimiento</option>
                      <option value="Otros">Otros</option>
                    </select>
                  ) : (
                    expense.category
                  )}
                </td>
                <td>
                  {editMode === expense.id ? (
                    <input
                      className="form-control"
                      type="date"
                      value={editedExpense?.date || ""}
                      onChange={(e) =>
                        setEditedExpense((prev) => ({
                          ...prev!,
                          date: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    expense.date
                  )}
                </td>
                <td>
                  {editMode === expense.id ? (
                    <input
                      className="form-control"
                      type="text"
                      value={editedExpense?.description || ""}
                      onChange={(e) =>
                        setEditedExpense((prev) => ({
                          ...prev!,
                          description: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    expense.description
                  )}
                </td>
                <td>
                  {editMode === expense.id ? (
                    <>
                      <button className="btn btn-primary" onClick={handleSave}>
                        Guardar
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setEditMode(null)}
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleEdit(expense)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(expense.id)}
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
