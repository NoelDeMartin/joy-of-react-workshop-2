import React, { useEffect } from "react";

import ToastShelf from "../ToastShelf";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const showToast = React.useCallback(({ variant, message }) => {
    setToasts((toasts) => [
      ...toasts,
      {
        id: crypto.randomUUID(),
        variant,
        message,
      },
    ]);
  }, []);

  function dismissToast(id) {
    setToasts(toasts.filter((toast) => toast.id !== id));
  }

  useEffect(() => {
    function dismissAllToasts(event) {
      if (event.key !== "Escape") {
        return;
      }

      setToasts([]);
    }

    window.addEventListener("keydown", dismissAllToasts);

    return () => window.removeEventListener("keydown", dismissAllToasts);
  }, []);

  return (
    <ToastContext value={{ showToast }}>
      <ToastShelf toasts={toasts} onDismiss={dismissToast} />

      {children}
    </ToastContext>
  );
}

export default ToastProvider;
