
import React, { useState } from 'react';
import { Product } from '../types';

interface EditProductModalProps {
  product: Product;
  onClose: () => void;
  onSave: (id: string, newName: string) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ product, onClose, onSave }) => {
  const [name, setName] = useState(product.name);

  const handleSave = () => {
    if (name.trim()) {
      onSave(product.id, name.trim());
    }
  };
  
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">Editar Produto</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nome do produto"
          className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          autoFocus
        />
        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded-md text-slate-700 bg-slate-100 hover:bg-slate-200">
            Cancelar
          </button>
          <button onClick={handleSave} className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400" disabled={!name.trim()}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
