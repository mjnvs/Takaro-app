
import React, { useState, useEffect } from 'react';
import SetupScreen from './components/SetupScreen';
import MainScreen from './components/MainScreen';

const App: React.FC = () => {
  const [supermarkets, setSupermarkets] = useState<string[]>([]);
  const [isSetupComplete, setIsSetupComplete] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const storedSupermarkets = localStorage.getItem('takaro-supermarkets');
      if (storedSupermarkets) {
        const parsedSupermarkets = JSON.parse(storedSupermarkets);
        if (Array.isArray(parsedSupermarkets) && parsedSupermarkets.length > 0) {
          setSupermarkets(parsedSupermarkets);
          setIsSetupComplete(true);
        }
      }
    } catch (error) {
      console.error("Failed to load supermarkets from localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSetupComplete = (names: string[]) => {
    localStorage.setItem('takaro-supermarkets', JSON.stringify(names));
    setSupermarkets(names);
    setIsSetupComplete(true);
  };

  const handleEditSupermarkets = () => {
     setIsSetupComplete(false);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen bg-slate-100">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {isSetupComplete ? (
        <MainScreen
          key={supermarkets.join('-')} 
          initialSupermarkets={supermarkets} 
          onEditSupermarkets={handleEditSupermarkets} 
        />
      ) : (
        <SetupScreen onSave={handleSetupComplete} initialSupermarkets={supermarkets} />
      )}
    </div>
  );
};

export default App;
