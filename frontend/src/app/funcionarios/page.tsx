"use client";

import { useState } from 'react';

export default function FuncionariosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const funcionarios = [
    {
      id: 1,
      name: 'aceqds',
      email: 'aceqds@johndeere.com',
      group: 'Administradores',
      status: 'Active',
      lastLogin: '2 days ago'
    },
    {
      id: 2,
      name: 'ghso2',
      email: 'ghso2@johndeere.com',
      group: 'Usuários',
      status: 'Active',
      lastLogin: '5 hours ago'
    },
    {
      id: 3,
      name: 'gjroeld',
      email: 'gjroeld@johndeere.com',
      group: 'Usuários',
      status: 'Inactive',
      lastLogin: '1 month ago'
    },
    {
      id: 4,
      name: 'gjrodk',
      email: 'gjrodk@johndeere.com',
      group: 'Operações',
      status: 'Active',
      lastLogin: '1 week ago'
    },
    {
      id: 5,
      name: 'gfgdol',
      email: 'gfgdol@johndeere.com',
      group: 'Manutenção',
      status: 'Active',
      lastLogin: 'Yesterday'
    },
    {
      id: 6,
      name: 'bjroelf',
      email: 'bjroelf@johndeere.com',
      group: 'Qualidade',
      status: 'Active',
      lastLogin: '3 hours ago'
    },
    {
      id: 7,
      name: 'aoqejhfl',
      email: 'aoqejhfl@johndeere.com',
      group: 'Logística',
      status: 'Active',
      lastLogin: '1 day ago'
    },
    {
      id: 8,
      name: 'bkfpeld',
      email: 'bkfpeld@johndeere.com',
      group: 'TI',
      status: 'Active',
      lastLogin: '4 hours ago'
    },
    {
      id: 9,
      name: 'lhçtodj',
      email: 'lhçtodj@johndeere.com',
      group: 'Administradores',
      status: 'Active',
      lastLogin: '2 hours ago'
    },
    {
      id: 10,
      name: 'quetr73',
      email: 'quetr73@johndeere.com',
      group: 'Usuários',
      status: 'Inactive',
      lastLogin: '2 weeks ago'
    }
  ];

  const filteredFuncionarios = funcionarios.filter(funcionario => {
    const matchesSearch = funcionario.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         funcionario.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroup === 'All' || funcionario.group === selectedGroup;
    const matchesStatus = selectedStatus === 'All' || funcionario.status === selectedStatus;
    
    return matchesSearch && matchesGroup && matchesStatus;
  });

  const groups = ['All', 'Administradores', 'Usuários', 'Operações', 'Manutenção', 'Qualidade', 'Logística', 'TI'];
  const statuses = ['All', 'Active', 'Inactive'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              alt="John Deere Logo" 
              className="h-10 w-auto" 
              src="/john-deere-logo.png"
            />
            <div>
              <h1 className="text-xl font-semibold text-johndeere-green" style={{ color: '#367C2B' }}>
                John Deere - Portal do Funcionário
              </h1>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-sm text-gray-600 cursor-pointer hover:text-johndeere-green">Dashboard</span>
                <span className="text-sm text-gray-600 cursor-pointer hover:text-johndeere-green">Diretório</span>
                <span className="text-sm text-gray-600 cursor-pointer hover:text-johndeere-green">Recursos</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-johndeere-green focus:border-johndeere-green"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button className="p-2 text-gray-600 hover:text-johndeere-green">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 7H4l5-5v5z" />
              </svg>
            </button>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-johndeere-green flex items-center justify-center text-white text-sm font-medium" style={{ backgroundColor: '#367C2B' }}>
                F
              </div>
              <span className="text-sm font-medium text-gray-700">Funcionário</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Diretório de Funcionários</h1>
          <p className="text-gray-600 mt-1">Portal interno - Informações da equipe John Deere</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-johndeere-green/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-johndeere-green" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Funcionários</p>
                <p className="text-2xl font-bold text-gray-900">{funcionarios.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Funcionários Ativos</p>
                <p className="text-2xl font-bold text-gray-900">{funcionarios.filter(f => f.status === 'Active').length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-johndeere-yellow/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Departamentos</p>
                <p className="text-2xl font-bold text-gray-900">{[...new Set(funcionarios.map(f => f.group))].length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                placeholder="Buscar por nome, email ou grupo..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-johndeere-green focus:border-johndeere-green"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-johndeere-green focus:border-johndeere-green"
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
              >
                {groups.map(group => (
                  <option key={group} value={group}>
                    Grupo: {group}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-johndeere-green focus:border-johndeere-green"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    Status: {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Employee Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    NOME
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    GRUPO
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    STATUS
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ÚLTIMO LOGIN
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFuncionarios.map((funcionario) => (
                  <tr key={funcionario.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{funcionario.name}</div>
                        <div className="text-sm text-gray-500">{funcionario.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        funcionario.group === 'Administradores' ? 'bg-blue-100 text-blue-800' :
                        funcionario.group === 'Usuários' ? 'bg-gray-100 text-gray-800' :
                        funcionario.group === 'Operações' ? 'bg-green-100 text-green-800' :
                        funcionario.group === 'Manutenção' ? 'bg-yellow-100 text-yellow-800' :
                        funcionario.group === 'Qualidade' ? 'bg-blue-100 text-blue-800' :
                        funcionario.group === 'Logística' ? 'bg-purple-100 text-purple-800' :
                        funcionario.group === 'TI' ? 'bg-indigo-100 text-indigo-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {funcionario.group}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                        funcionario.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1 ${
                          funcionario.status === 'Active' ? 'bg-green-400' : 'bg-gray-400'
                        }`}></span>
                        {funcionario.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {funcionario.lastLogin}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="bg-white px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Anterior
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Próximo
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Mostrando <span className="font-medium">1</span> até <span className="font-medium">{filteredFuncionarios.length}</span> de{' '}
                  <span className="font-medium">{funcionarios.length}</span> resultados
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Anterior</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Próximo</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}