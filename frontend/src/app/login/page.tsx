"use client";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex flex-col items-center justify-center w-full p-4">
        <div className="w-full max-w-md">
          <header className="flex flex-col items-center justify-center mb-8">
            <img
              alt="John Deere Logo"
              className="h-16 mb-4"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA69LApczTLyMCVIM2t9WH6DJYgmb9y3ZbygrmbZ9nHmo1oj3LWYqhutux4zcxQEVhcqhH8NrvX_KJjj8VE6DItV4_MAUWGYObw4Mnhl2W2SgcumNI-ii2aGg524nNpzseTuQ1gdxdYkK-mcKn6aGfzhFNd8vZxsNCGtJzVcxBezHYAnGNaPcsGjSG8xP-6FU86p010kcndwaZfzPQ5qeuxrmMkbX5RuUVYd36SDgPHXnOoxA02Cy8FBP8A7vBolwwWVOpeqjoX1uo" // Add the logo to your public folder
            />
            <h1 className="text-3xl font-bold text-johndeere-green">
              User Management System
            </h1>
          </header>
          <main className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Acessar sua conta
              </h2>
              <p className="text-gray-500">
                Bem-vindo de volta!
              </p>
            </div>
            <form className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  E-mail ou nome de usuário
                </label>
                <div className="relative mt-1">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    person
                  </span>
                  <input
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-johndeere-green focus:border-johndeere-green"
                    id="email"
                    name="email"
                    placeholder="seu-email@exemplo.com"
                    type="email"
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
                    className="text-sm font-medium text-johndeere-green hover:text-johndeere-green/80"
                    href="#"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
                <div className="relative mt-1">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    lock
                  </span>
                  <input
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-johndeere-green focus:border-johndeere-green"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
              </div>
              <button
                className="w-full bg-johndeere-green text-white font-semibold py-2 px-4 rounded-lg hover:bg-johndeere-green/90 transition-colors duration-200"
                type="submit"
              >
                Entrar
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Não tem uma conta?{" "}
                <a
                  className="font-medium text-johndeere-green hover:text-johndeere-green/80"
                  href="#"
                >
                  Cadastre-se
                </a>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}