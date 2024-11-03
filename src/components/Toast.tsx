import React from "react";

interface ToastProps {
  visible: boolean;
  type: "create" | "edit" | "delete";
  amount?: number;
  category?: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  visible,
  type,
  amount,
  category,
  onClose,
}) => {
  if (!visible) return null;

  const getMessage = () => {
    switch (type) {
      case "create":
        return `Se ha añadido un gasto nuevo de $${amount} en la categoría ${category}.`;
      case "edit":
        return `El gasto de $${amount} en la categoría ${category} ha sido editado.`;
      case "delete":
        return `El gasto ha sido eliminado.`;
      default:
        return "";
    }
  };

  return (
    <div
      className="toast show position-fixed bottom-0 end-0 m-3 z-3"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-header">
        <strong className="me-auto">
          {type === "create" && "Gasto Agregado"}
          {type === "edit" && "Gasto Editado"}
          {type === "delete" && "Gasto Eliminado"}
        </strong>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onClose}
        ></button>
      </div>
      <div className="toast-body">{getMessage()}</div>
    </div>
  );
};

export default Toast;
