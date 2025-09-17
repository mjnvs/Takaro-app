import React, { useState } from 'react';

interface SignupScreenProps {
    onSignupSuccess: () => void;
    onNavigateToLogin: () => void;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ onSignupSuccess, onNavigateToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = () => {
        // Mock signup logic
        if (name.trim() && email.trim() && password && password === confirmPassword) {
            onSignupSuccess();
        }
    };

    const isButtonDisabled = !name.trim() || !email.trim() || !password || password !== confirmPassword;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
            <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-2xl text-center">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Crie sua Conta</h1>
                <p className="text-slate-600 mb-6">É rápido e fácil!</p>
                
                <div className="space-y-4 text-left">
                    <div>
                        <label className="text-sm font-medium text-slate-600 mb-1 block">Nome</label>
                        <input
                            type="text"
                            placeholder="Seu nome completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 text-lg border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                        />
                    </div>
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
                            placeholder="Crie uma senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 text-lg border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                        />
                    </div>
                     <div>
                        <label className="text-sm font-medium text-slate-600 mb-1 block">Confirmar Senha</label>
                        <input
                            type="password"
                            placeholder="Confirme sua senha"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 text-lg border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                        />
                    </div>
                </div>
                
                <button
                    onClick={handleSignup}
                    disabled={isButtonDisabled}
                    className={`w-full mt-8 py-3 px-6 text-lg font-semibold text-white rounded-lg transition-all duration-300 ${
                        isButtonDisabled 
                        ? 'bg-slate-400 cursor-not-allowed' 
                        : 'bg-indigo-600 hover:bg-indigo-700 transform hover:-translate-y-1 shadow-lg'
                    }`}
                >
                    Cadastrar
                </button>

                <div className="mt-6 text-sm">
                    <span className="text-slate-600">Já tem uma conta? </span>
                    <button onClick={onNavigateToLogin} className="font-medium text-indigo-600 hover:text-indigo-500">
                        Entrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignupScreen;
