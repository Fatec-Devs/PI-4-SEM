"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok && data.ok) {
        if (data.isAdmin) {
          router.push('/admin/home');
        } else {
          router.push('/funcionarios');
        }
      } else {
        setError(data.error || 'Credenciais inválidas');
      }
    } catch (err) {
      setError('Erro ao conectar ao servidor. Tente novamente.');
      console.error('Erro no login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center w-full p-4">
        <div className="w-full max-w-md">
          <header className="flex flex-col items-center justify-center mb-8">
            <img
              alt="John Deere Logo"
              className="h-20 w-auto rounded-lg mb-4"
              src="/john-deere-logo.png"
            />
            <h1 className="text-3xl font-bold text-johndeere-green" style={{ color: '#367C2B' }}>
              Sistema John Deere
            </h1>
            <p className="text-gray-600 mt-2 text-center">
              Machine Track & Management
            </p>
          </header>
          <main className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Acessar sua conta
              </h2>
              <p className="text-gray-600">
                Bem-vindo ao sistema John Deere
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="email"
                >
                  E-mail ou nome de usuário
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    person
                  </span>
                  <input
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-johndeere-green focus:border-johndeere-green"
                    id="email"
                    name="email"
                    placeholder="Digite seu e-mail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="password"
                >
                  Senha
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    lock
                  </span>
                  <input
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-johndeere-green focus:border-johndeere-green"
                    id="password"
                    name="password"
                    placeholder="Digite sua senha"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm"
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-johndeere-green border-gray-300 rounded focus:ring-johndeere-green"
                  />
                  <span className="ml-2 text-gray-600">Lembrar de mim</span>
                </label>
                <a href="#" className="text-johndeere-green hover:underline" style={{ color: '#367C2B' }}>
                  Esqueceu a senha?
                </a>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 text-white bg-johndeere-green hover:bg-johndeere-green/90 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-johndeere-green focus:ring-offset-2 transition-colors disabled:opacity-50"
                style={{ backgroundColor: loading ? '#367C2B80' : '#367C2B' }}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
            
            {/* Info sobre roles */}
            <div className="mt-6 p-4 bg-johndeere-yellow/10 border border-johndeere-yellow/30 rounded-lg">
              <p className="text-xs text-gray-600 text-center">
                <strong>Portal Funcionários:</strong> Use "admin@johndeere.com" para área administrativa ou qualquer outro email para portal de funcionários<br/>
                <strong>Machine Track:</strong> Acesse <a href="/UserAPP/login" className="text-johndeere-green underline">/UserAPP/login</a> para operadores de campo
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
