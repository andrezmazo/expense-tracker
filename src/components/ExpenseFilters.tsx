import React, { useState } from "react";
import "./ExpenseFilters.css";

interface ExpenseFiltersProps {
  onFilter: (filters: {
    category?: string;
    startDate?: string;
    endDate?: string;
  }) => void;
}

const ExpenseFilters: React.FC<ExpenseFiltersProps> = ({ onFilter }) => {
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showClearButton, setShowClearButton] = useState(false);

  const handleFilter = () => {
    onFilter({ category, startDate, endDate });
    setShowClearButton(!!(category || startDate || endDate));
  };

  const handleClearFilters = () => {
    // Limpiar los filtros
    setCategory("");
    setStartDate("");
    setEndDate("");
    onFilter({ category: "", startDate: "", endDate: "" }); // Actualizar con filtros vacíos
    setShowClearButton(false); // Ocultar el botón de Borrar Filtros
  };

  return (
    <div className="card p-3 mb-3">
      <h4>Filtros</h4>
      <div className="list-container">
        <div className="list-filter filters-container mb-3">
          <label>Categoría</label>
          <select
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Todas</option>
            <option value="Comida">Comida</option>
            <option value="Transporte">Transporte</option>
            <option value="Entretenimiento">Entretenimiento</option>
          </select>
        </div>
        <div className="list-filter filters-container mb-3">
          <label>Fecha de Inicio</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="list-filter filters-container mb-3">
          <label>Fecha de Fin</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <div className="list-container">
        <button
          onClick={handleFilter}
          className="list-filter btn btn-primary col-5"
        >
          Aplicar Filtros
        </button>
        {showClearButton && (
          <button
            onClick={handleClearFilters}
            className="list-filter btn btn-secondary mt-2 col-5"
          >
            Borrar Filtros
          </button>
        )}
      </div>
    </div>
  );
};

export default ExpenseFilters;
