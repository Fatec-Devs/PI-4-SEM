"use client";

import Link from 'next/link';

export default function AdminHomePage() {
  return (
    <div className="flex min-h-screen">
      <aside className="flex w-64 flex-col border-r border-gray-200 bg-white shadow-lg">
        <div className="flex h-16 items-center px-6 shrink-0 bg-white border-b border-gray-200">
          <img 
            alt="John Deere Logo" 
            className="h-10 w-auto rounded-lg" 
            src="/john-deere-logo.png"
          />
          <div className="ml-3">
            <h1 className="text-lg font-bold text-johndeere-green" style={{ color: '#367C2B' }}>Admin</h1>
            <p className="text-sm text-gray-600">John Deere</p>
          </div>
        </div>
        <nav className="flex-1 space-y-2 px-4 py-4 bg-white">
          <Link href="#" className="flex items-center gap-3 rounded-md bg-johndeere-green/10 px-3 py-2 text-johndeere-green font-semibold" style={{ backgroundColor: '#367C2B1A', color: '#367C2B' }}>
            <img 
              alt="John Deere Logo" 
              className="h-5 w-auto" 
              src="/john-deere-logo.png"
            />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-johndeere-green transition-colors">
            <span className="material-symbols-outlined">group</span>
            <span className="text-sm font-medium">Usuários</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-johndeere-green transition-colors">
            <span className="material-symbols-outlined">groups</span>
            <span className="text-sm font-medium">Grupos</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-johndeere-green transition-colors">
            <span className="material-symbols-outlined">analytics</span>
            <span className="text-sm font-medium">Relatórios</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-johndeere-green transition-colors">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm font-medium">Configurações</span>
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Usuários</h1>
            <p className="text-gray-600 mt-1">
              Bem-vindo de volta, aqui está um resumo da sua operação.
            </p>
          </div>
          <button 
            className="flex items-center gap-2 rounded-md bg-johndeere-green px-4 py-2 text-sm font-bold text-white hover:bg-johndeere-green/90 transition-colors"
            style={{ backgroundColor: '#367C2B' }}
          >
            <span className="material-symbols-outlined">add</span>
            Adicionar Usuário
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-johndeere-green">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-johndeere-green" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total de Usuários</p>
                <p className="text-xl font-bold text-gray-800">10</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Usuários Ativos</p>
                <p className="text-xl font-bold text-gray-800">8</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Usuários Inativos</p>
                <p className="text-xl font-bold text-gray-800">2</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark">search</span>
            <input 
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-gray-900 placeholder-gray-500 focus:border-johndeere-green focus:outline-none focus:ring-1 focus:ring-johndeere-green" 
              placeholder="Buscar por nome ou email..." 
              type="text"
            />
          </div>
          <div>
            <select className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 focus:border-johndeere-green focus:outline-none focus:ring-1 focus:ring-johndeere-green">
              <option>Filtrar por Grupo</option>
              <option>Administradores</option>
              <option>Usuários</option>
            </select>
          </div>
          <div>
            <select className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 focus:border-johndeere-green focus:outline-none focus:ring-1 focus:ring-johndeere-green">
              <option>Filtrar por Status</option>
              <option>Ativo</option>
              <option>Inativo</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 font-medium text-gray-600 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 font-medium text-gray-600 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 font-medium text-gray-600 uppercase tracking-wider">Grupo</th>
                <th className="px-6 py-3 font-medium text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 font-medium text-gray-600 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Carlos Silva</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">carlos.silva@johndeere.com</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">Administradores</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">Ativo</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <a className="font-medium text-johndeere-green hover:underline" href="#">Editar</a>
                  <span className="mx-2 text-gray-300">|</span>
                  <a className="font-medium text-red-600 hover:underline" href="#">Excluir</a>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Ana Souza</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">ana.souza@johndeere.com</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-800">Usuários</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">Ativo</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <a className="font-medium text-johndeere-green hover:underline" href="#">Editar</a>
                  <span className="mx-2 text-gray-300">|</span>
                  <a className="font-medium text-red-600 hover:underline" href="#">Excluir</a>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Pedro Almeida</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">pedro.almeida@johndeere.com</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-800">Usuários</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800">Inativo</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <a className="font-medium text-johndeere-green hover:underline" href="#">Editar</a>
                  <span className="mx-2 text-gray-300">|</span>
                  <a className="font-medium text-red-600 hover:underline" href="#">Excluir</a>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Maria Santos</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">maria.santos@johndeere.com</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">Operações</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">Ativo</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <a className="font-medium text-johndeere-green hover:underline" href="#">Editar</a>
                  <span className="mx-2 text-gray-300">|</span>
                  <a className="font-medium text-red-600 hover:underline" href="#">Excluir</a>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">João Oliveira</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">joao.oliveira@johndeere.com</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">Manutenção</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">Ativo</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <a className="font-medium text-johndeere-green hover:underline" href="#">Editar</a>
                  <span className="mx-2 text-gray-300">|</span>
                  <a className="font-medium text-red-600 hover:underline" href="#">Excluir</a>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Fernanda Costa</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">fernanda.costa@johndeere.com</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">Qualidade</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">Ativo</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <a className="font-medium text-johndeere-green hover:underline" href="#">Editar</a>
                  <span className="mx-2 text-gray-300">|</span>
                  <a className="font-medium text-red-600 hover:underline" href="#">Excluir</a>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Roberto Lima</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">roberto.lima@johndeere.com</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-800">Logística</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">Ativo</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <a className="font-medium text-johndeere-green hover:underline" href="#">Editar</a>
                  <span className="mx-2 text-gray-300">|</span>
                  <a className="font-medium text-red-600 hover:underline" href="#">Excluir</a>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Juliana Martins</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">juliana.martins@johndeere.com</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-800">TI</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">Ativo</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <a className="font-medium text-johndeere-green hover:underline" href="#">Editar</a>
                  <span className="mx-2 text-gray-300">|</span>
                  <a className="font-medium text-red-600 hover:underline" href="#">Excluir</a>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Ricardo Pereira</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">ricardo.pereira@johndeere.com</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">Administradores</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">Ativo</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <a className="font-medium text-johndeere-green hover:underline" href="#">Editar</a>
                  <span className="mx-2 text-gray-300">|</span>
                  <a className="font-medium text-red-600 hover:underline" href="#">Excluir</a>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Camila Rodrigues</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">camila.rodrigues@johndeere.com</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-800">Usuários</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800">Inativo</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <a className="font-medium text-johndeere-green hover:underline" href="#">Editar</a>
                  <span className="mx-2 text-gray-300">|</span>
                  <a className="font-medium text-red-600 hover:underline" href="#">Excluir</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}