import React from "react";
import { useExpenseContext } from "../context/ExpenseContext";
import "./ExpenseSummary.css";

const ExpenseSummary: React.FC = () => {
  const { expenses } = useExpenseContext();

  const sumTotal = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const categories = [
    "Total",
    "Comida",
    "Transporte",
    "Entretenimiento",
    "Otros",
  ];

  const totalByCategory = expenses.reduce((totals, expense) => {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
    return totals;
  }, {} as { [category: string]: number });

  return (
    <div className="summary-container">
      <h4>Resumen de Gastos</h4>
      <div className="cards-container">
        {categories.map((category) => {
          let amount =
            category === "Total" ? sumTotal : totalByCategory[category] || 0;
          return (
            <div
              key={category}
              className={`card expense-card ${category.toLowerCase()}`}
            >
              <h5>{category}</h5>
              <p>${amount}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseSummary;
