"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Funcionario {
  matricula: string;
  nome: string;
  username: string;
  email: string | null;
  grupo?: string;
  status: 'Ativo' | 'Inativo';
}

export default function AdminHomePage() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFuncionarios, setSelectedFuncionarios] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Buscar funcionários do banco
  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const fetchFuncionarios = async () => {
    try {
      const response = await fetch('/api/funcionariobd');
      if (response.ok) {
        const data = await response.json();
        // Adicionar status padrão e grupo
        const funcionariosComDados = data.map((func: any) => ({
          ...func,
          status: func.matricula === 'ADMIN001' ? 'Ativo' : 'Ativo', // Por enquanto todos ativos
          grupo: func.matricula === 'ADMIN001' ? 'Administradores' : 'Usuários'
        }));
        setFuncionarios(funcionariosComDados);
      } else {
        setError('Erro ao carregar funcionários');
      }
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
      setError('Erro ao conectar ao servidor');
    } finally {
      setLoading(false);
    }
  };

  // Seleção individual
  const handleSelectFuncionario = (matricula: string) => {
    const newSelected = new Set(selectedFuncionarios);
    if (newSelected.has(matricula)) {
      newSelected.delete(matricula);
    } else {
      newSelected.add(matricula);
    }
    setSelectedFuncionarios(newSelected);
    setSelectAll(newSelected.size === funcionarios.length);
  };

  // Selecionar todos
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedFuncionarios(new Set());
      setSelectAll(false);
    } else {
      const allMatriculas = new Set(funcionarios.map(f => f.matricula));
      setSelectedFuncionarios(allMatriculas);
      setSelectAll(true);
    }
  };

  // Excluir funcionários selecionados
  const handleDeleteSelected = async () => {
    if (selectedFuncionarios.size === 0) {
      alert('Selecione pelo menos um funcionário para excluir');
      return;
    }

    const ok = window.confirm(`Tem certeza que deseja excluir ${selectedFuncionarios.size} funcionário(s)?`);
    if (!ok) return;
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      const response = await fetch('/api/funcionariobd', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          matriculas: Array.from(selectedFuncionarios)
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        // Recarregar lista
        fetchFuncionarios();
        // Limpar seleção
        setSelectedFuncionarios(new Set());
        setSelectAll(false);
      } else {
        const error = await response.json();
        alert('Erro ao excluir: ' + (error.error || 'Erro desconhecido'));
      }
    } catch (error) {
      console.error('Erro ao excluir funcionários:', error);
      alert('Erro ao conectar ao servidor');
    } finally {
      setIsDeleting(false);
    }
  };

  // Excluir funcionário individual
  const handleDeleteFuncionario = async (matricula: string) => {
    const ok = window.confirm('Tem certeza que deseja excluir este funcionário?');
    if (!ok) return;
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      const response = await fetch('/api/funcionariobd', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matricula }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        fetchFuncionarios();
      } else {
        const error = await response.json();
        alert('Erro ao excluir: ' + (error.message || 'Erro desconhecido'));
      }
    } catch (error) {
      console.error('Erro ao excluir funcionário:', error);
      alert('Erro ao conectar ao servidor');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

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
          <Link 
            href="/admin/Cadastro-Funcionario"
            className="flex items-center gap-2 rounded-md bg-johndeere-green px-4 py-2 text-sm font-bold text-white hover:bg-johndeere-green/90 transition-colors"
            style={{ backgroundColor: '#367C2B' }}
          >
            <span className="material-symbols-outlined">add</span>
            Adicionar Usuário
          </Link>
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
                <p className="text-xl font-bold text-gray-800">{funcionarios.length}</p>
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
                <p className="text-xl font-bold text-gray-800">{funcionarios.filter(f => f.status === 'Ativo').length}</p>
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
                <p className="text-xl font-bold text-gray-800">{funcionarios.filter(f => f.status === 'Inativo').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de ações em massa */}
        {selectedFuncionarios.size > 0 && (
          <div className="mb-6 bg-white rounded-lg shadow p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {selectedFuncionarios.size} funcionário(s) selecionado(s)
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleDeleteSelected}
                  className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                  Excluir Selecionados
                </button>
                <button
                  onClick={() => {
                    setSelectedFuncionarios(new Set());
                    setSelectAll(false);
                  }}
                  className="px-3 py-2 bg-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
        
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

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 font-medium text-gray-600 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-johndeere-green border-gray-300 rounded focus:ring-johndeere-green"
                  />
                </th>
                <th className="px-6 py-3 font-medium text-gray-600 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 font-medium text-gray-600 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 font-medium text-gray-600 uppercase tracking-wider">Grupo</th>
                <th className="px-6 py-3 font-medium text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 font-medium text-gray-600 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {funcionarios.map((funcionario) => (
                <tr key={funcionario.matricula} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedFuncionarios.has(funcionario.matricula)}
                      onChange={() => handleSelectFuncionario(funcionario.matricula)}
                      className="w-4 h-4 text-johndeere-green border-gray-300 rounded focus:ring-johndeere-green"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{funcionario.nome}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{funcionario.email || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                      funcionario.grupo === 'Administradores' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {funcionario.grupo}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                      funcionario.status === 'Ativo' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {funcionario.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button 
                      className="font-medium text-johndeere-green hover:underline mr-3"
                      onClick={() => alert('Funcionalidade de edição em desenvolvimento')}
                    >
                      Editar
                    </button>
                    <button 
                      className="font-medium text-red-600 hover:underline"
                      onClick={() => handleDeleteFuncionario(funcionario.matricula)}
                      disabled={funcionario.matricula === 'ADMIN001'}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
              {funcionarios.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Nenhum funcionário encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
