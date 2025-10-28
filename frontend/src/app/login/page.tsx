"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de login - em produção, isso seria uma chamada à API
    if (email && password) {
      router.push('/admin/home');
    }
  };

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <div className="flex flex-col items-center justify-center w-full p-4">
        <div className="w-full max-w-md">
          <header className="flex flex-col items-center justify-center mb-8">
            <img
              alt="John Deere Logo"
              className="h-20 mb-4 rounded-lg"
              src="/john-deere-logo.png"
            />
            <h1 className="text-3xl font-bold font-display text-johndeere-green dark:text-johndeere-yellow">
              User Management System
            </h1>
          </header>
          <main className="bg-white dark:bg-zinc-900/50 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold font-display text-slate-800 dark:text-slate-100">
                Acessar sua conta
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                Bem-vindo de volta!
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div>
                <label
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                  htmlFor="email"
                >
                  E-mail ou nome de usuário
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                    person
                  </span>
                  <input
                    className="form-input w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-johndeere-green focus:border-johndeere-green text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 pl-10 peer"
                    id="email"
                    name="email"
                    placeholder="seu-email@exemplo.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-describedby="email-error"
                  />
                </div>
                <p className="mt-2 text-sm text-error hidden peer-invalid:block" id="email-error">
                  Por favor, insira um e-mail válido.
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                    htmlFor="password"
                  >
                    Senha
                  </label>
                  <a
                    className="text-sm font-medium text-johndeere-green hover:text-johndeere-green/80 dark:text-johndeere-yellow dark:hover:text-johndeere-yellow/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-johndeere-green/50 dark:focus:ring-offset-background-dark rounded"
                    href="#"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                    lock
                  </span>
                  <input
                    className="form-input w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-johndeere-green focus:border-johndeere-green text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 pl-10 peer"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    aria-describedby="password-error"
                  />
                </div>
                <p className="mt-2 text-sm text-error hidden peer-invalid:block" id="password-error">
                  A senha é obrigatória.
                </p>
              </div>
              <button
                className="w-full bg-green-600 bg-johndeere-green text-white font-bold py-3 px-4 rounded-lg
                hover:bg-green-700 hover:bg-johndeere-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-green-600 focus:ring-johndeere-green/50 dark:bg-johndeere-yellow dark:text-zinc-900
                dark:hover:bg-johndeere-yellow/90 dark:focus:ring-johndeere-yellow/50
                dark:focus:ring-offset-background-dark transition-colors duration-300"
                type="submit"
              >
                Entrar
              </button>
              <div className="mt-6 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Não tem uma conta? <a href="#" className="font-medium text-johndeere-green hover:text-johndeere-green/80 dark:text-johndeere-yellow dark:hover:text-johndeere-yellow/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-johndeere-green/50 dark:focus:ring-offset-background-dark rounded">Cadastre-se</a>
                </p>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}