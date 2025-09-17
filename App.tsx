import React, { useState, useEffect } from 'react';
import SetupScreen from './components/SetupScreen';
import MainScreen from './components/MainScreen';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';

type View = 'login' | 'signup' | 'forgotPassword' | 'app';

const App: React.FC = () => {
  const [supermarkets, setSupermarkets] = useState<string[]>([]);
  const [isSetupComplete, setIsSetupComplete] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<View>('login');

  useEffect(() => {
    // This effect is now simplified as login is the entry point.
    // Supermarket loading logic is moved to after login.
    setIsLoading(false); 
  }, []);

  const loadUserDaata = () => {
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
    }
  }

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentView('app');
    loadUserDaata();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('login');
    setSupermarkets([]);
    setIsSetupComplete(false);
  };

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
  
  const renderContent = () => {
    if (!isLoggedIn) {
        switch(currentView) {
            case 'login':
                return <LoginScreen onLoginSuccess={handleLoginSuccess} onNavigateToSignup={() => setCurrentView('signup')} onNavigateToForgotPassword={() => setCurrentView('forgotPassword')} />;
            case 'signup':
                return <SignupScreen onSignupSuccess={handleLoginSuccess} onNavigateToLogin={() => setCurrentView('login')} />;
            case 'forgotPassword':
                return <ForgotPasswordScreen onResetRequest={() => setCurrentView('login')} onNavigateToLogin={() => setCurrentView('login')} />;
            default:
                return <LoginScreen onLoginSuccess={handleLoginSuccess} onNavigateToSignup={() => setCurrentView('signup')} onNavigateToForgotPassword={() => setCurrentView('forgotPassword')} />;
        }
    }

    if (isSetupComplete) {
        return <MainScreen
          key={supermarkets.join('-')}
          initialSupermarkets={supermarkets}
          onEditSupermarkets={handleEditSupermarkets}
          onLogout={handleLogout}
        />
    } else {
        return <SetupScreen onSave={handleSetupComplete} initialSupermarkets={supermarkets} />
    }
  }


  return (
    <div className="min-h-screen bg-slate-100">
      {renderContent()}
    </div>
  );
};

export default App;
