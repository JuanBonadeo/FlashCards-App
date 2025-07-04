import React from "react";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  resourceName?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
  loading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title,
  message,
  resourceName,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onClose,
  loading = false,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fondo oscuro desenfocado */}
      <div
        className="fixed inset-0 backdrop-blur-sm bg-black/30"
        onClick={onClose}
      />

      {/* Contenido del modal */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-50 bg-white rounded-xl p-6 max-w-sm w-full shadow-lg animate-fade-in"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">
          {message}
          {resourceName && (
            <>
              {" "}
              <strong className="text-black">&quot;{resourceName}&quot;</strong>.
            </>
          )}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Procesando..." : confirmLabel}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
