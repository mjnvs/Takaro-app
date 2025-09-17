import React from 'react';

interface ConfirmDeleteModalProps {
  productName: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ productName, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center sm:text-left" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4 text-slate-800">Confirmar Exclusão</h2>
        <p className="text-slate-600">
          Tem certeza que deseja remover o produto "<strong>{productName}</strong>"?
        </p>
        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded-md text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
            Cancelar
          </button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors">
            Remover
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;