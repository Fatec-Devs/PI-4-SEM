"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserAppLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de login - em produção, isso seria uma chamada à API
    if (email && password) {
      router.push('/UserAPP/home');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center w-full p-4">
        <div className="w-full max-w-md">
          <header className="flex flex-col items-center justify-center mb-8">
            <img
              alt="John Deere Logo"
              className="h-16 w-auto rounded-md mb-4"
              src="/john-deere-logo.png"
            />
            <h1 className="text-2xl font-bold text-johndeere-green" style={{ color: '#367C2B' }}>
              Machine Track App
            </h1>
            <p className="text-gray-600 mt-2 text-center">
              Aplicativo para Operadores de Campo
            </p>
          </header>
          <main className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Acessar Machine Track
              </h2>
              <p className="text-sm text-gray-500">
                Login exclusivo para operadores
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  E-mail ou código do operador
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-johndeere-green focus:border-johndeere-green"
                    id="email"
                    name="email"
                    placeholder="operador@johndeere.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="password"
                  >
                    Senha
                  </label>
                  <a
                    className="text-xs text-johndeere-green hover:text-johndeere-green/80"
                    href="#"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-johndeere-green focus:border-johndeere-green"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button
                className="w-full bg-johndeere-green text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                type="submit"
                style={{ backgroundColor: '#367C2B' }}
              >
                Entrar no Machine Track
              </button>
              <div className="flex items-center justify-center">
                <p className="text-xs text-gray-500">
                  Precisa de acesso? <a href="#" className="text-johndeere-green hover:underline" style={{ color: '#367C2B' }}>Contate o supervisor</a>
                </p>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}