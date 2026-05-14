// src/components/ui/ConfirmModal.tsx
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
  /** Controla si el modal está visible */
  isOpen: boolean;
  /** Título del modal */
  title: string;
  /** Mensaje descriptivo */
  message: string;
  /** Texto del botón de confirmación (por defecto "Sí, eliminar") */
  confirmText?: string;
  /** Texto del botón de cancelar (por defecto "Cancelar") */
  cancelText?: string;
  /** Color de acento: 'red' (peligro) o 'blue' (informativo). Por defecto 'red' */
  variant?: 'red' | 'blue';
  /** Función al confirmar */
  onConfirm: () => void;
  /** Función al cancelar o cerrar */
  onCancel: () => void;
  /** Estado de carga (para deshabilitar botones mientras se procesa) */
  isLoading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Sí, eliminar',
  cancelText = 'Cancelar',
  variant = 'red',
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const variantColors = {
    red: {
      iconBg: 'bg-red-500/20',
      iconColor: 'text-red-400',
      buttonBg: 'bg-red-600 hover:bg-red-700',
    },
    blue: {
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-400',
      buttonBg: 'bg-blue-600 hover:bg-blue-700',
    },
  }[variant];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0A0D14] border border-white/10 rounded-xl shadow-2xl p-6 w-full max-w-sm transform transition-all scale-100 opacity-100">
        <div className="flex items-center gap-3 mb-4">
          <div className={`${variantColors.iconBg} p-2 rounded-full ${variantColors.iconColor}`}>
            <AlertTriangle size={24} />
          </div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>

        <p className="text-gray-300 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-4 py-2 text-white font-semibold rounded-lg shadow-sm transition-colors disabled:opacity-50 ${variantColors.buttonBg}`}
          >
            {isLoading ? 'Procesando...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
