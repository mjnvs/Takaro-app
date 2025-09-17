
import React, { useState } from 'react';

interface SetupScreenProps {
  onSave: (names: string[]) => void;
  initialSupermarkets: string[];
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onSave, initialSupermarkets }) => {
  const [names, setNames] = useState<[string, string, string]>(() => {
    const initial: [string, string, string] = ['', '', ''];
    if (initialSupermarkets) {
      initial[0] = initialSupermarkets[0] || '';
      initial[1] = initialSupermarkets[1] || '';
      initial[2] = initialSupermarkets[2] || '';
    }
    return initial;
  });

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...names] as [string, string, string];
    newNames[index] = value;
    setNames(newNames);
  };

  const handleSave = () => {
    const filteredNames = names.map(name => name.trim()).filter(Boolean);
    if (filteredNames.length > 0) {
      onSave(filteredNames);
    }
  };

  const isSaveDisabled = names.every(name => name.trim() === '');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Bem-vindo ao Takaro!</h1>
        <p className="text-slate-600 mb-6">Quais supermercados você quer comparar?</p>
        
        <div className="space-y-4">
          {[0, 1, 2].map(index => (
            <input
              key={index}
              type="text"
              placeholder={`Nome do Supermercado ${index + 1}`}
              value={names[index]}
              onChange={(e) => handleNameChange(index, e.target.value)}
              className="w-full px-4 py-3 text-lg border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            />
          ))}
        </div>
        
        <button
          onClick={handleSave}
          disabled={isSaveDisabled}
          className={`w-full mt-8 py-3 px-6 text-lg font-semibold text-white rounded-lg transition-all duration-300 ${
            isSaveDisabled 
              ? 'bg-slate-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 transform hover:-translate-y-1 shadow-lg'
          }`}
        >
          Salvar e Começar
        </button>
      </div>
    </div>
  );
};

export default SetupScreen;
