import React, { useState } from 'react';

interface ForgotPasswordScreenProps {
  onResetRequest: () => void;
  onNavigateToLogin: () => void;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ onResetRequest, onNavigateToLogin }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleResetRequest = () => {
    if (email.trim() !== '') {
        // Mock submission
        setIsSubmitted(true);
        setTimeout(() => {
            onResetRequest();
        }, 3000)
    }
  };

  const isButtonDisabled = email.trim() === '';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-2xl text-center">
        {!isSubmitted ? (
            <>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Recuperar Senha</h1>
                <p className="text-slate-600 mb-6">Insira seu email para enviarmos um link de recuperação.</p>
                
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
                </div>
                
                <button
                    onClick={handleResetRequest}
                    disabled={isButtonDisabled}
                    className={`w-full mt-8 py-3 px-6 text-lg font-semibold text-white rounded-lg transition-all duration-300 ${
                        isButtonDisabled 
                        ? 'bg-slate-400 cursor-not-allowed' 
                        : 'bg-indigo-600 hover:bg-indigo-700 transform hover:-translate-y-1 shadow-lg'
                    }`}
                >
                Enviar Link
                </button>

                <div className="mt-6 text-sm">
                    <button onClick={onNavigateToLogin} className="font-medium text-indigo-600 hover:text-indigo-500">
                        Voltar para o Login
                    </button>
                </div>
            </>
        ) : (
             <div>
                <h1 className="text-2xl font-bold text-slate-800 mb-2">Verifique seu Email</h1>
                <p className="text-slate-600">Se uma conta com este email existir, enviamos um link para redefinir sua senha.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
