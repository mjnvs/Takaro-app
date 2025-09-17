import React, { useMemo } from 'react';
import { Product } from '../types';
import { PencilIcon } from './icons/PencilIcon';
import { TrashIcon } from './icons/TrashIcon';

interface ProductRowProps {
  product: Product;
  supermarkets: string[];
  onPriceChange: (productId: string, supermarketIndex: number, price: number | null) => void;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

const ProductRow: React.FC<ProductRowProps> = ({ product, supermarkets, onPriceChange, onEdit, onDelete }) => {

  const minPrice = useMemo(() => {
    const validPrices = product.prices.filter(p => p !== null && p > 0) as number[];
    return validPrices.length > 1 ? Math.min(...validPrices) : null;
  }, [product.prices]);

  const handlePriceInputChange = (index: number, value: string) => {
    const parsedValue = parseFloat(value);
    onPriceChange(product.id, index, isNaN(parsedValue) ? null : parsedValue);
  };
  
  const gridTemplateColumns = `minmax(140px, 1.5fr) repeat(${supermarkets.length}, minmax(120px, 1fr))`;

  const renderPriceInput = (index: number) => {
    const price = product.prices[index];
    const isCheapest = minPrice !== null && price !== null && price === minPrice;
    const isMoreExpensive = minPrice !== null && price !== null && price > minPrice;
    const percentageDiff = isMoreExpensive
        ? (((price - minPrice) / minPrice) * 100).toFixed(0)
        : null;
    
    return (
      <div>
        <div className="flex items-center relative">
          <span className="absolute left-3 text-slate-400">R$</span>
          <input
            type="number"
            step="0.01"
            placeholder="0,00"
            value={price === null ? '' : price}
            onChange={(e) => handlePriceInputChange(index, e.target.value)}
            className={`w-full pl-9 pr-2 py-2 border-2 rounded-md transition-all duration-200 text-center font-semibold text-lg ${
                isCheapest
                ? 'border-green-400 bg-green-50 ring-2 ring-green-200 text-green-700'
                : isMoreExpensive
                ? 'border-red-300 bg-red-50 text-red-700'
                : 'border-slate-200 bg-white text-slate-800 hover:border-indigo-300'
            }`}
          />
        </div>
        {percentageDiff && (
            <div className="mt-1 text-xs text-red-500 font-semibold text-center">
                +{percentageDiff}% mais caro
            </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Mobile Layout */}
      <div className="p-3 md:hidden">
        <div className="flex items-center justify-between pb-2 mb-2 border-b">
          <span className="font-medium text-slate-800 pr-2 break-words">{product.name}</span>
          <div className="flex items-center flex-shrink-0">
            <button 
              onClick={() => onEdit(product)} 
              className="p-2 text-slate-500 hover:text-blue-600 rounded-full hover:bg-slate-100" 
              aria-label={`Editar ${product.name}`}
            >
              <PencilIcon />
            </button>
            <button 
              onClick={() => onDelete(product.id)} 
              className="p-2 text-slate-500 hover:text-red-600 rounded-full hover:bg-slate-100" 
              aria-label={`Remover ${product.name}`}
            >
              <TrashIcon />
            </button>
          </div>
        </div>
        <div className="space-y-4 mt-3">
          {supermarkets.map((name, index) => {
            const price = product.prices[index];
            const isCheapest = minPrice !== null && price !== null && price === minPrice;

            return (
                <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                        <label className="font-medium text-slate-700 truncate pr-2" title={name}>{name}</label>
                        {isCheapest && (
                            <div className="text-xs bg-green-500 text-white font-bold px-2 py-0.5 rounded-full shadow flex-shrink-0">
                                Mais Barato
                            </div>
                        )}
                    </div>
                    {renderPriceInput(index)}
                </div>
            )
          })}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid gap-2 items-center p-2" style={{ gridTemplateColumns }}>
        <div className="flex items-center justify-between p-1">
          <span className="font-medium text-slate-800 pr-2">{product.name}</span>
          <div className="flex items-center flex-shrink-0">
            <button 
              onClick={() => onEdit(product)} 
              className="p-2 text-slate-500 hover:text-blue-600 rounded-full hover:bg-slate-100" 
              aria-label={`Editar ${product.name}`}
            >
              <PencilIcon />
            </button>
            <button 
              onClick={() => onDelete(product.id)} 
              className="p-2 text-slate-500 hover:text-red-600 rounded-full hover:bg-slate-100" 
              aria-label={`Remover ${product.name}`}
            >
              <TrashIcon />
            </button>
          </div>
        </div>
        {Array.from({ length: supermarkets.length }).map((_, index) => {
            const price = product.prices[index];
            const isCheapest = minPrice !== null && price !== null && price === minPrice;
            
            return (
              <div key={index} className="text-center relative">
                  {renderPriceInput(index)}
                   {isCheapest && (
                    <div className="absolute -top-1.5 -right-1.5 text-xs bg-green-500 text-white font-bold px-2 py-0.5 rounded-full shadow transform rotate-12">
                        Mais Barato
                    </div>
                  )}
              </div>
            )
        })}
      </div>
    </div>
  );
};

export default React.memo(ProductRow);