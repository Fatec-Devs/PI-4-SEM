"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  // Se estiver na página de login, não mostrar o layout padrão
  if (pathname === "/UserAPP/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-lg transition-all duration-300 ease-in-out h-full`}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-johndeere-green p-2 rounded-md">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA69LApczTLyMCVIM2t9WH6DJYgmb9y3ZbygrmbZ9nHmo1oj3LWYqhutux4zcxQEVhcqhH8NrvX_KJjj8VE6DItV4_MAUWGYObw4Mnhl2W2SgcumNI-ii2aGg524nNpzseTuQ1gdxdYkK-mcKn6aGfzhFNd8vZxsNCGtJzVcxBezHYAnGNaPcsGjSG8xP-6FU86p010kcndwaZfzPQ5qeuxrmMkbX5RuUVYd36SD"
                alt="John Deere Logo"
                className="h-8 w-8"
              />
            </div>
            {sidebarOpen && (
              <span className="ml-3 text-xl font-bold text-johndeere-green">
                Machine Track
              </span>
            )}
          </div>

          <nav className="flex-1">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/UserAPP/home"
                  className={`flex items-center p-3 rounded-md ${
                    isActive("/UserAPP/home")
                      ? "bg-johndeere-green text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="material-symbols-outlined">dashboard</span>
                  {sidebarOpen && <span className="ml-3">Visão Geral</span>}
                </Link>
              </li>
              <li>
                <Link
                  href="/UserAPP/equipamentos"
                  className={`flex items-center p-3 rounded-md ${
                    isActive("/UserAPP/equipamentos")
                      ? "bg-johndeere-green text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="material-symbols-outlined">agriculture</span>
                  {sidebarOpen && <span className="ml-3">Meus Equipamentos</span>}
                </Link>
              </li>
              <li>
                <Link
                  href="/UserAPP/tarefas"
                  className={`flex items-center p-3 rounded-md ${
                    isActive("/UserAPP/tarefas")
                      ? "bg-johndeere-green text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="material-symbols-outlined">assignment</span>
                  {sidebarOpen && <span className="ml-3">Minhas Tarefas</span>}
                </Link>
              </li>
              <li>
                <Link
                  href="/UserAPP/alertas"
                  className={`flex items-center p-3 rounded-md ${
                    isActive("/UserAPP/alertas")
                      ? "bg-johndeere-green text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="material-symbols-outlined">notifications</span>
                  {sidebarOpen && <span className="ml-3">Alertas</span>}
                </Link>
              </li>
              <li>
                <Link
                  href="/UserAPP/perfil"
                  className={`flex items-center p-3 rounded-md ${
                    isActive("/UserAPP/perfil")
                      ? "bg-johndeere-green text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="material-symbols-outlined">person</span>
                  {sidebarOpen && <span className="ml-3">Meu Perfil</span>}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="mt-auto">
            <Link
              href="/login"
              className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <span className="material-symbols-outlined">logout</span>
              {sidebarOpen && <span className="ml-3">Sair</span>}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 focus:outline-none"
            >
              <span className="material-symbols-outlined">
                {sidebarOpen ? "menu_open" : "menu"}
              </span>
            </button>

            <div className="flex items-center space-x-4">
              <button className="text-gray-500 focus:outline-none relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm">person</span>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  João Silva
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}