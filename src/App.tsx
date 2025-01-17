import React, { useState } from "react";
import { ExpenseProvider } from "./context/ExpenseContext";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpenseFilters from "./components/ExpenseFilters";
import ExpenseChart from "./components/ExpenseChart";
import logo from "./logo.jpg";
import "./App.css";

const App: React.FC = () => {
  const handleSubmit = () => {};

  // Estado para almacenar los filtros
  const [filters, setFilters] = useState<{
    category?: string;
    startDate?: string;
    endDate?: string;
  }>({});

  // Función para actualizar los filtros
  const handleFilter = (newFilters: {
    category?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    setFilters(newFilters);
  };

  return (
    <ExpenseProvider>
      <div className="container d-flex flex-column gap-3">
        <div className="d-flex gap-4 align-items-center">
          <img src={logo} className="img-logo" alt="" />
          <h1>EXPENSE TRACKER</h1>
        </div>
        <ExpenseSummary />
        <ExpenseChart />
        <ExpenseForm onSubmit={handleSubmit} />
        <ExpenseFilters onFilter={handleFilter} />
        <ExpenseList filters={filters} />{" "}
      </div>
    </ExpenseProvider>
  );
};

export default App;
