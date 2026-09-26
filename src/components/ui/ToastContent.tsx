import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import Toast, { type ToastData, type ToastType } from "./Toast";

import "../../styles/ui/toast.css";

interface ToastContextType {

  success: (title: string, message: string) => void;

  danger: (title: string, message: string) => void;

  warning: (title: string, message: string) => void;

  info: (title: string, message: string) => void;

}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = (
    type: ToastType,
    title: string,
    message: string
  ) => {

    const id = Date.now();

    const toast = {
      id,
      type,
      title,
      message,
    };

    setToasts((prev) => [...prev, toast]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: number) => {

    setToasts((prev) =>
      prev.filter((toast) => toast.id !== id)
    );

  };

  return (

    <ToastContext.Provider
      value={{
        success: (t, m) => addToast("success", t, m),
        danger: (t, m) => addToast("danger", t, m),
        warning: (t, m) => addToast("warning", t, m),
        info: (t, m) => addToast("info", t, m),
      }}
    >

      {children}

      <div className="toast-container">

        {toasts.map((toast) => (

          <Toast
            key={toast.id}
            toast={toast}
            onClose={removeToast}
          />

        ))}

      </div>

    </ToastContext.Provider>

  );

}

export function useToastContext() {

  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToastContext must be used inside ToastProvider"
    );
  }

  return context;

}