import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Product } from '../types';
import { INITIAL_PRODUCTS_DATA } from '../constants';
import ProductRow from './ProductRow';
import TotalsFooter from './TotalsFooter';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { PlusIcon } from './icons/PlusIcon';
import { MoreIcon } from './icons/MoreIcon';

interface MainScreenProps {
  initialSupermarkets: string[];
  onEditSupermarkets: () => void;
}

const MainScreen: React.FC<MainScreenProps> = ({ initialSupermarkets, onEditSupermarkets }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [supermarkets, setSupermarkets] = useState<string[]>(initialSupermarkets);
  const [isLoading, setIsLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  
  const storageKey = `takaro-products-${initialSupermarkets.join('-').replace(/\s+/g, '')}`;

  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem(storageKey);
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        const initialProducts = INITIAL_PRODUCTS_DATA.map((p, index) => ({
          id: `${Date.now()}-${index}`,
          name: p.name,
          prices: Array(supermarkets.length).fill(null),
        }));
        setProducts(initialProducts);
      }
    } catch(e) {
        console.error("Failed to load products", e);
    } finally {
        setIsLoading(false);
    }
  }, [storageKey, supermarkets.length]);

  useEffect(() => {
    if (!isLoading) {
        try {
            localStorage.setItem(storageKey, JSON.stringify(products));
        } catch(e) {
            console.error("Failed to save products", e);
        }
    }
  }, [products, storageKey, isLoading]);

  const handlePriceChange = useCallback((productId: string, supermarketIndex: number, price: number | null) => {
    setProducts(prevProducts =>
      prevProducts.map(p => {
        if (p.id === productId) {
          const newPrices = [...p.prices];
          newPrices[supermarketIndex] = price;
          return { ...p, prices: newPrices };
        }
        return p;
      })
    );
  }, []);

  const handleAddProduct = (name: string) => {
    const newProduct: Product = {
      id: `${Date.now()}`,
      name,
      prices: Array(supermarkets.length).fill(null),
    };
    setProducts(prev => [...prev, newProduct]);
    setShowAddModal(false);
  };

  const handleEditProduct = (id: string, newName: string) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, name: newName } : p)));
    setEditingProduct(null);
  };

  const handleDeleteProduct = useCallback((id: string) => {
    setDeletingProductId(id);
  }, []);
  
  const handleConfirmDelete = () => {
    if (deletingProductId) {
      setProducts(prev => prev.filter(p => p.id !== deletingProductId));
      setDeletingProductId(null);
    }
  };

  const handleClearPrices = () => {
    if (window.confirm('Tem certeza que deseja limpar todos os preços? Esta ação não pode ser desfeita.')) {
        setProducts(prev => prev.map(p => ({ ...p, prices: Array(supermarkets.length).fill(null) })));
    }
    setShowOptionsMenu(false);
  };

  const totals = useMemo(() => {
    return supermarkets.map((_, index) =>
      products.reduce((sum, product) => {
        const price = product.prices[index];
        return sum + (price || 0);
      }, 0)
    );
  }, [products, supermarkets]);

  if(isLoading) {
      return <div className="flex justify-center items-center h-screen">Carregando produtos...</div>
  }

  return (
    <div className="pb-48">
      <header className="sticky top-0 bg-indigo-600 shadow-md z-20 text-white p-4 flex justify-between items-center h-[72px]">
        <h1 className="text-2xl font-bold">Takaro</h1>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowAddModal(true)} 
            className="p-2 rounded-full hover:bg-indigo-500"
            aria-label="Adicionar Produto"
          >
            <PlusIcon />
          </button>
          <div className="relative">
            <button onClick={() => setShowOptionsMenu(prev => !prev)} className="p-2 rounded-full hover:bg-indigo-500">
              <MoreIcon />
            </button>
            {showOptionsMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-30 text-slate-800">
                <ul className="py-1">
                  <li>
                    <button onClick={onEditSupermarkets} className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-100">
                      Editar Supermercados
                    </button>
                  </li>
                  <li>
                    <button onClick={handleClearPrices} className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-100">
                      Limpar Todos os Preços
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="overflow-x-auto p-2 sm:p-4">
        <div className="w-full md:min-w-max">
            <div className="hidden md:grid gap-2 sticky top-[72px] bg-slate-100 py-2 z-10 border-b-2 border-slate-200" style={{gridTemplateColumns: `minmax(140px, 1.5fr) repeat(${supermarkets.length}, minmax(120px, 1fr))`}}>
                <div className="font-bold text-slate-700 p-3">Produtos</div>
                {supermarkets.map((name) => (
                    <div key={name} className="font-bold text-slate-700 p-3 text-center truncate">{name}</div>
                ))}
            </div>

            <div className="space-y-2">
            {products.map(product => (
                <ProductRow
                key={product.id}
                product={product}
                supermarkets={supermarkets}
                onPriceChange={handlePriceChange}
                onEdit={() => setEditingProduct(product)}
                onDelete={handleDeleteProduct}
                />
            ))}
            </div>
        </div>
      </div>

      <TotalsFooter totals={totals} supermarkets={supermarkets} />

      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddProduct}
        />
      )}

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={handleEditProduct}
        />
      )}

      {deletingProductId && (
        <ConfirmDeleteModal
          productName={products.find(p => p.id === deletingProductId)?.name || 'Este produto'}
          onClose={() => setDeletingProductId(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default MainScreen;