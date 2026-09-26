import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimesCircle, FaTimes } from "react-icons/fa";

export type ToastType =
  | "success"
  | "danger"
  | "warning"
  | "info";

export interface ToastData {
  id: number;
  title: string;
  message: string;
  type: ToastType;
}

interface ToastProps {
  toast: ToastData;
  onClose: (id: number) => void;
}

export default function Toast({
  toast,
  onClose,
}: ToastProps) {

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <FaCheckCircle className="toast-icon" />;

      case "danger":
        return <FaTimesCircle className="toast-icon" />;

      case "warning":
        return <FaExclamationTriangle className="toast-icon" />;

      default:
        return <FaInfoCircle className="toast-icon" />;
    }
  };

  return (
    <div className={`toast toast-${toast.type}`}>

      {getIcon()}

      <div className="toast-content">

        <div className="toast-title">
          {toast.title}
        </div>

        <div className="toast-message">
          {toast.message}
        </div>

      </div>

      <button
        className="toast-close"
        onClick={() => onClose(toast.id)}
      >
        <FaTimes />
      </button>

    </div>
  );
}