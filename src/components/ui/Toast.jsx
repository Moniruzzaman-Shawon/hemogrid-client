import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ToastContext = createContext(null);

let idSeq = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const add = useCallback((message, { type = "info", duration = 4000 } = {}) => {
    const id = ++idSeq;
    const toast = { id, message, type };
    setToasts((prev) => [...prev, toast]);
    if (duration > 0) {
      setTimeout(() => remove(id), duration);
    }
    return id;
  }, [remove]);

  const api = useMemo(() => ({
    show: add,
    success: (msg, opts) => add(msg, { type: "success", ...opts }),
    error: (msg, opts) => add(msg, { type: "error", ...opts }),
    info: (msg, opts) => add(msg, { type: "info", ...opts }),
  }), [add]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-3 rounded shadow-lg text-white flex items-center gap-3 min-w-[260px] ${
              t.type === "success" ? "bg-green-600" : t.type === "error" ? "bg-red-600" : "bg-gray-800"
            }`}
            role="status"
          >
            <span className="flex-1">{t.message}</span>
            <button className="text-white/80 hover:text-white" onClick={() => remove(t.id)} aria-label="Close">
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};
