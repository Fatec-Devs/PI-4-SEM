'use client';

import { useRouter } from 'next/navigation';

interface HeaderProps {
  username: string;
  role?: string;
  userType: 'employee' | 'application';
}

export default function Header({ username, role, userType }: HeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const endpoint = userType === 'employee' ? '/api/employees/logout' : '/api/app-users/logout';
    await fetch(endpoint, { method: 'POST' });
    router.push(`/login/${userType}`);
  };

  const getRoleName = (roleCode: string) => {
    const roles: Record<string, string> = {
      'ROLE_1': 'Dashboard Principal',
      'ROLE_2': 'Gerenciamento de Maquinário',
      'ROLE_3': 'Relatórios e Análises',
      'ROLE_4': 'Administração',
      'ADMIN': 'Administrador',
      'COMUM': 'Usuário Comum',
    };
    return roles[roleCode] || roleCode;
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo e Título */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-white">
              <img 
                src="/john-deere-logo.png" 
                alt="John Deere Logo" 
                className="w-full h-full object-cover scale-110"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold text-johndeere-green dark:text-johndeere-yellow">
                John Deere
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {userType === 'employee' ? 'Sistema de Gerenciamento' : 'Machine Track'}
              </p>
            </div>
          </div>

          {/* Informações do Usuário */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3 px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-center w-8 h-8 bg-johndeere-green rounded-full">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  {username}
                </p>
                {role && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {getRoleName(role)}
                  </p>
                )}
              </div>
            </div>

            {/* Botão de Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-800 transition-all group"
              title="Sair do sistema"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline text-sm font-semibold">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
