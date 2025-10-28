"use client";

export default function UserAppLogin() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <header className="flex flex-col items-center justify-center mb-8">
          <img
            alt="John Deere Logo"
            className="h-20 mb-4 rounded-lg"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA69LApczTLyMCVIM2t9WH6DJYgmb9y3ZbygrmbZ9nHmo1oj3LWYqhutux4zcxQEVhcqhH8NrvX_KJjj8VE6DItV4_MAUWGYObw4Mnhl2W2SgcumNI-ii2aGg524nNpzseTuQ1gdxdYkK-mcKn6aGfzhFNd8vZxsNCGtJzVcxBezHYAnGNaPcsGjSG8xP-6FU86p010kcndwaZfzPQ5qeuxrmMkbX5RuUVYd36SDgPHXnOoxA02Cy8FBP8A7vBolwwWVOpeqjoX1uo"
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
          <form className="space-y-6" noValidate>
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
                  required
                  type="email"
                  aria-describedby="email-error"
                />
              </div>
              <p
                className="mt-2 text-sm text-error hidden peer-invalid:block"
                id="email-error"
              >
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
                  required
                  type="password"
                  aria-describedby="password-error"
                />
              </div>
              <p
                className="mt-2 text-sm text-error hidden peer-invalid:block"
                id="password-error"
              >
                A senha é obrigatória.
              </p>
            </div>
            <button
              className="w-full bg-johndeere-green text-white font-bold py-3 px-4 rounded-lg hover:bg-johndeere-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-johndeere-green/50 dark:bg-johndeere-yellow dark:text-zinc-900 dark:hover:bg-johndeere-yellow/90 dark:focus:ring-johndeere-yellow/50 dark:focus:ring-offset-background-dark transition-colors duration-300"
              type="submit"
            >
              Entrar
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Não tem uma conta?{" "}
              <a
                className="font-medium text-johndeere-green hover:text-johndeere-green/80 dark:text-johndeere-yellow dark:hover:text-johndeere-yellow/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-johndeere-green/50 dark:focus:ring-offset-background-dark rounded"
                href="#"
              >
                Cadastre-se
              </a>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}