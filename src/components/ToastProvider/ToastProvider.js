import React from "react";

import ToastShelf from "../ToastShelf";
import useEscapeKey from "../../hooks/useEscapeKey";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);
  const dismissAllToasts = React.useCallback(() => setToasts([]), []);
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

  useEscapeKey(dismissAllToasts);

  return (
    <ToastContext value={{ showToast }}>
      <ToastShelf
        toasts={toasts}
        onDismiss={(id) => setToasts(toasts.filter((toast) => toast.id !== id))}
      />

      {children}
    </ToastContext>
  );
}

export default ToastProvider;
