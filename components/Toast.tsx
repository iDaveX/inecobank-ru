"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Info, X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useId,
  useState,
} from "react";

type ToastVariant = "success" | "info";

type ToastItem = {
  id: string;
  message: string;
  variant: ToastVariant;
  accent?: string;
};

type ToastContextValue = {
  showToast: (message: string, variant?: ToastVariant, accent?: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const uid = useId();

  const showToast = useCallback(
    (message: string, variant: ToastVariant = "success", accent?: string) => {
      const id = `${uid}-${Date.now()}`;
      setToasts((prev) => [...prev, { id, message, variant, accent }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 3500);
    },
    [uid],
  );

  const dismiss = (id: string) =>
    setToasts((prev) => prev.filter((toast) => toast.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="flex min-w-[280px] max-w-sm items-start gap-3 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black/5"
            >
              <div
                className="w-1 shrink-0 self-stretch"
                style={{
                  backgroundColor: toast.accent ?? "#0A7C3E",
                }}
              />
              <div className="flex flex-1 items-center gap-2 py-3 pr-2">
                {toast.variant === "success" ? (
                  <CheckCircle
                    className="h-4 w-4 shrink-0"
                    style={{ color: toast.accent ?? "#0A7C3E" }}
                  />
                ) : (
                  <Info className="h-4 w-4 shrink-0 text-blue-500" />
                )}
                <p className="text-sm text-gray-700">{toast.message}</p>
              </div>
              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                className="mr-2 mt-3 shrink-0 text-gray-300 transition-colors hover:text-gray-500"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
