import React from "react";
import { Bar } from "react-chartjs-2";
import { useExpenseContext } from "../context/ExpenseContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./ExpenseChart.css";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseChart: React.FC = () => {
  const { expenses } = useExpenseContext();

  const categoryTotals = expenses.reduce((totals, expense) => {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
    return totals;
  }, {} as { [category: string]: number });

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Gastos por Categoría",
        data: Object.values(categoryTotals),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  return (
    <div className="chart-container flex-column">
      <h4>Visualización de Gastos</h4>
      <Bar data={data} />
    </div>
  );
};

export default ExpenseChart;
