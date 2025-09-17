import React, { useState } from 'react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onNavigateToSignup: () => void;
  onNavigateToForgotPassword: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onNavigateToSignup, onNavigateToForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {
    // Mock login logic
    if (email.trim() !== '' && password.trim() !== '') {
      onLoginSuccess();
    }
  };

  const isButtonDisabled = email.trim() === '' || password.trim() === '';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-2xl text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Login</h1>
        <p className="text-slate-600 mb-6">Bem-vindo de volta!</p>
        
        <div className="space-y-4 text-left">
          <div>
            <label className="text-sm font-medium text-slate-600 mb-1 block">Email</label>
            <input
              type="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-lg border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600 mb-1 block">Senha</label>
            <input
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-lg border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            />
          </div>
        </div>
        
        <button
          onClick={handleLogin}
          disabled={isButtonDisabled}
          className={`w-full mt-8 py-3 px-6 text-lg font-semibold text-white rounded-lg transition-all duration-300 ${
            isButtonDisabled 
              ? 'bg-slate-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 transform hover:-translate-y-1 shadow-lg'
          }`}
        >
          Entrar
        </button>

        <div className="mt-6 text-sm">
          <button onClick={onNavigateToForgotPassword} className="font-medium text-indigo-600 hover:text-indigo-500">
            Esqueceu sua senha?
          </button>
        </div>
        <div className="mt-2 text-sm">
          <span className="text-slate-600">Não tem uma conta? </span>
          <button onClick={onNavigateToSignup} className="font-medium text-indigo-600 hover:text-indigo-500">
            Cadastre-se
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
