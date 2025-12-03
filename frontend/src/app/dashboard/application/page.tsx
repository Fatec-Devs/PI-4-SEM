'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function ApplicationDashboard() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch('/api/auth/me');
      const data = await response.json();

      if (response.ok && data.user.type === 'application') {
        setUsername(data.user.username);
        setUserRole(data.user.role || 'ROLE_1');
      } else {
        router.push('/login/application');
      }
    } catch (error) {
      router.push('/login/application');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  const renderDashboardByRole = () => {
    switch (userRole) {
      case 'ROLE_1':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-johndeere-green/10 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-7 h-7 text-johndeere-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Dashboard Principal</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Visão geral de todas as operações</p>
                </div>
              </div>
            
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group hover:shadow-xl transition-all bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between mb-4">
                    <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="text-2xl font-bold text-blue-900 dark:text-blue-100">248</span>
                  </div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 text-lg mb-2">Relatórios Gerais</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">Visualize todos os relatórios</p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors group-hover:scale-105 transform">
                    Acessar Relatórios
                  </button>
                </div>

                <div className="group hover:shadow-xl transition-all bg-gradient-to-br from-johndeere-green/10 to-green-100/50 dark:from-green-900/20 dark:to-green-800/10 p-6 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between mb-4">
                    <svg className="w-8 h-8 text-johndeere-green dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="text-2xl font-bold text-green-900 dark:text-green-100">42</span>
                  </div>
                  <h3 className="font-semibold text-green-900 dark:text-green-100 text-lg mb-2">Usuários Ativos</h3>
                  <p className="text-sm text-green-700 dark:text-green-300 mb-4">Gerencie usuários do sistema</p>
                  <button className="w-full bg-johndeere-green hover:bg-johndeere-green/90 text-white px-4 py-2.5 rounded-lg font-medium transition-colors group-hover:scale-105 transform">
                    Gerenciar Usuários
                  </button>
                </div>

                <div className="group hover:shadow-xl transition-all bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center justify-between mb-4">
                    <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-2xl font-bold text-purple-900 dark:text-purple-100">12</span>
                  </div>
                  <h3 className="font-semibold text-purple-900 dark:text-purple-100 text-lg mb-2">Configurações</h3>
                  <p className="text-sm text-purple-700 dark:text-purple-300 mb-4">Ajuste configurações gerais</p>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors group-hover:scale-105 transform">
                    Abrir Configurações
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ROLE_2':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-johndeere-green/10 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-7 h-7 text-johndeere-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Gerenciamento de Maquinário</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Monitoramento e controle de equipamentos John Deere</p>
                </div>
              </div>
            
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-johndeere-green/10 to-green-100/50 dark:from-green-900/20 dark:to-green-800/10 p-6 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between mb-3">
                    <svg className="w-10 h-10 text-johndeere-green" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 20H5V4h14m0-2H5c-1.11 0-2 .89-2 2v16a1 1 0 001 1h16a1 1 0 001-1V4a2 2 0 00-2-2m-7 6h5v2h-5V8m0 4h5v2h-5v-2m0 4h5v2h-5v-2M4 8h3v2H4V8m0 4h3v2H4v-2m0 4h3v2H4v-2z"/>
                    </svg>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-johndeere-green dark:text-green-400">15</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Unidades</p>
                    </div>
                  </div>
                  <h3 className="font-bold text-green-900 dark:text-green-100 text-lg mb-2">Tratores em Operação</h3>
                  <div className="mt-4 p-4 bg-white dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Eficiência Operacional</span>
                      <span className="text-lg font-bold text-johndeere-green">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div className="bg-johndeere-green h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 dark:from-yellow-900/20 dark:to-yellow-800/10 p-6 rounded-xl border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center justify-between mb-3">
                    <svg className="w-10 h-10 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">3</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Pendentes</p>
                    </div>
                  </div>
                  <h3 className="font-bold text-yellow-900 dark:text-yellow-100 text-lg mb-2">Manutenção Pendente</h3>
                  <ul className="mt-4 space-y-2">
                    <li className="text-sm bg-white dark:bg-gray-700 p-3 rounded-lg flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                      <span className="text-gray-700 dark:text-gray-300">Trator #1234 - Troca de Óleo</span>
                    </li>
                    <li className="text-sm bg-white dark:bg-gray-700 p-3 rounded-lg flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                      <span className="text-gray-700 dark:text-gray-300">Colheitadeira #5678 - Filtro</span>
                    </li>
                    <li className="text-sm bg-white dark:bg-gray-700 p-3 rounded-lg flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                      <span className="text-gray-700 dark:text-gray-300">Pulverizador #9012 - Revisão</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between mb-3">
                    <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">100%</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Conectado</p>
                    </div>
                  </div>
                  <h3 className="font-bold text-blue-900 dark:text-blue-100 text-lg mb-2">Rastreamento GPS</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">Localização em tempo real de todos os equipamentos</p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors">
                    Abrir Mapa Completo
                  </button>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-900/20 dark:to-red-800/10 p-6 rounded-xl border border-red-200 dark:border-red-800">
                  <div className="flex items-center justify-between mb-3">
                    <svg className="w-10 h-10 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-red-600 dark:text-red-400">1</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Crítico</p>
                    </div>
                  </div>
                  <h3 className="font-bold text-red-900 dark:text-red-100 text-lg mb-2">Alertas Críticos</h3>
                  <div className="mt-4 bg-white dark:bg-gray-700 p-4 rounded-lg border-l-4 border-red-500">
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1">Trator #7890</p>
                    <p className="text-xs text-red-600 dark:text-red-400 mb-2">Temperatura do motor elevada</p>
                    <button className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded font-medium transition-colors">
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ROLE_3':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4 text-purple-900">📈 Dashboard de Relatórios</h2>
            <p className="text-gray-600 mb-6">
              Acesse relatórios detalhados e análises de desempenho do sistema.
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
                <h3 className="font-semibold text-purple-900 text-lg">📊 Relatórios Disponíveis</h3>
                <div className="mt-4 space-y-3">
                  <div className="bg-white p-4 rounded border-l-4 border-purple-500">
                    <h4 className="font-semibold">Relatório de Produtividade</h4>
                    <p className="text-sm text-gray-600">Análise mensal de produtividade das máquinas</p>
                    <button className="mt-2 bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 text-sm">
                      Gerar PDF
                    </button>
                  </div>
                  <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                    <h4 className="font-semibold">Relatório de Manutenção</h4>
                    <p className="text-sm text-gray-600">Histórico de manutenções realizadas</p>
                    <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm">
                      Gerar PDF
                    </button>
                  </div>
                  <div className="bg-white p-4 rounded border-l-4 border-green-500">
                    <h4 className="font-semibold">Relatório de Consumo</h4>
                    <p className="text-sm text-gray-600">Análise de consumo de combustível</p>
                    <button className="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 text-sm">
                      Gerar PDF
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                <h3 className="font-semibold text-gray-900 text-lg">📅 Relatórios Agendados</h3>
                <p className="text-sm text-gray-600 mt-2">Configure relatórios automáticos</p>
                <button className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
                  Configurar Agendamentos
                </button>
              </div>
            </div>
          </div>
        );

      case 'ROLE_4':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4 text-red-900">🔐 Dashboard de Administração</h2>
            <p className="text-gray-600 mb-6">
              Acesso completo às configurações e administração do sistema.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200">
                <h3 className="font-semibold text-red-900 text-lg">👤 Gerenciamento de Usuários</h3>
                <p className="text-sm text-red-700 mt-2">Controle total de usuários e permissões</p>
                <div className="mt-4 space-y-2">
                  <button className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                    Gerenciar Usuários
                  </button>
                  <button className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Permissões e Roles
                  </button>
                </div>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
                <h3 className="font-semibold text-orange-900 text-lg">⚙️ Configurações do Sistema</h3>
                <p className="text-sm text-orange-700 mt-2">Ajustes avançados do sistema</p>
                <div className="mt-4 space-y-2">
                  <button className="w-full bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
                    Configurações Gerais
                  </button>
                  <button className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                    Integrações
                  </button>
                </div>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
                <h3 className="font-semibold text-yellow-900 text-lg">📋 Logs do Sistema</h3>
                <p className="text-sm text-yellow-700 mt-2">Visualize todos os logs e auditorias</p>
                <button className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 w-full">
                  Ver Logs
                </button>
              </div>
              <div className="bg-indigo-50 p-6 rounded-lg border-2 border-indigo-200">
                <h3 className="font-semibold text-indigo-900 text-lg">🔄 Backup e Restore</h3>
                <p className="text-sm text-indigo-700 mt-2">Gerencie backups do sistema</p>
                <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full">
                  Gerenciar Backups
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Bem-vindo ao Sistema de Aplicação</h2>
            <p className="text-gray-600">
              Aguardando detecção de role... Role atual: {userRole || 'não detectada'}
            </p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-johndeere-green mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-xl text-gray-600 dark:text-gray-400">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header username={username} role={userRole} userType="application" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderDashboardByRole()}
      </main>
    </div>
  );
}
