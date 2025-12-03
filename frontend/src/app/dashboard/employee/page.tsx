'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

interface AppUser {
  id: string;
  username: string;
  description: string | null;
  role: string;
  status: string;
  lastRotation: string | null;
  passwordExpiresAt: string;
  createdAt: string;
}

interface PasswordCache {
  [userId: string]: string | null;
}

export default function EmployeeDashboard() {
  const router = useRouter();
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [isAdmin, setIsAdmin] = useState(false);
  const [userRole, setUserRole] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<AppUser | null>(null);
  const [newUsername, setNewUsername] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newRole, setNewRole] = useState('ROLE_1');
  const [newStatus, setNewStatus] = useState('ACTIVE');
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [passwordCache, setPasswordCache] = useState<PasswordCache>({});
  const [loadingPassword, setLoadingPassword] = useState<string | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState<{username: string, password: string} | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 15;

  useEffect(() => {
    fetchCurrentUser();
    fetchUsers();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch('/api/auth/me');
      const data = await response.json();
      if (response.ok && data.user.type === 'employee') {
        setUsername(data.user.username);
        setUserRole(data.user.role);
        setIsAdmin(data.user.role === 'ADMIN');
      }
    } catch (err) {
      console.error('Error fetching user info:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/app-users');
      const data = await response.json();

      if (response.ok) {
        setUsers(data.users);
        // Detectar role do usuário logado
        if (data.userRole) {
          setUserRole(data.userRole);
          setIsAdmin(data.userRole === 'ADMIN');
        }
      } else if (response.status === 401) {
        router.push('/login/employee');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  const handleSelectUser = (userId: string) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedUsers.size === users.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(users.map(u => u.id)));
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Tem certeza que deseja excluir ${selectedUsers.size} usuário(s)?`)) {
      return;
    }

    try {
      const response = await fetch('/api/app-users/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userIds: Array.from(selectedUsers) }),
      });

      if (response.ok) {
        setSelectedUsers(new Set());
        fetchUsers();
      }
    } catch (err) {
      alert('Erro ao excluir usuários');
    }
  };

  const handleBulkRotate = async () => {
    if (!confirm(`Tem certeza que deseja rotacionar senhas de ${selectedUsers.size} usuário(s)?`)) {
      return;
    }

    try {
      const response = await fetch('/api/app-users/bulk-rotate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userIds: Array.from(selectedUsers) }),
      });

      const data = await response.json();

      if (response.ok && data.results.rotated.length > 0) {
        // Atualizar cache com as novas senhas
        const newCache: PasswordCache = {};
        data.results.rotated.forEach((r: any) => {
          newCache[r.id] = r.newPassword;
        });
        setPasswordCache(prev => ({ ...prev, ...newCache }));

        // Mostrar modal com a primeira senha rotacionada
        setCurrentPassword({
          username: data.results.rotated[0].username,
          password: data.results.rotated[0].newPassword
        });
        setShowPasswordModal(true);

        // Se mais de uma senha, avisar
        if (data.results.rotated.length > 1) {
          setTimeout(() => {
            alert(`✅ ${data.results.rotated.length} senhas rotacionadas!\n\nClique no botão "Ver Senha" de cada usuário para copiar individualmente.`);
          }, 500);
        }

        setSelectedUsers(new Set());
        fetchUsers();
      } else if (data.results.failed.length > 0) {
        alert(`❌ Falhas: ${data.results.failed.length}\n${data.results.failed.map((f: any) => f.error).join('\n')}`);
      }
    } catch (err) {
      alert('Erro ao rotacionar senhas');
    }
  };

  const handleCreateUser = async () => {
    if (!newUsername) {
      alert('Username é obrigatório');
      return;
    }

    try {
      const response = await fetch('/api/app-users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: newUsername, description: newDescription, role: newRole }),
      });

      const data = await response.json();

      if (response.ok) {
        setGeneratedPassword(data.user.password);
        setNewUsername('');
        setNewDescription('');
        setNewRole('ROLE_1');
        fetchUsers();
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('Erro ao criar usuário');
    }
  };

  const handleEditUser = (user: AppUser) => {
    setEditingUser(user);
    setNewUsername(user.username);
    setNewDescription(user.description || '');
    setNewRole(user.role);
    setNewStatus(user.status);
    setShowEditModal(true);
  };

  const handleUpdateUser = async () => {
    if (!editingUser || !newUsername) {
      alert('Username é obrigatório');
      return;
    }

    try {
      const response = await fetch(`/api/app-users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: newUsername,
          description: newDescription,
          role: newRole,
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Usuário atualizado com sucesso!');
        setShowEditModal(false);
        setEditingUser(null);
        setNewUsername('');
        setNewDescription('');
        setNewRole('ROLE_1');
        setNewStatus('ACTIVE');
        fetchUsers();
      } else {
        alert(data.error || 'Erro ao atualizar usuário');
      }
    } catch (err) {
      alert('Erro ao atualizar usuário');
    }
  };

  const handleDeleteUser = async (userId: string, username: string) => {
    if (!confirm(`Tem certeza que deseja excluir o usuário "${username}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/app-users/${userId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Usuário excluído com sucesso!');
        fetchUsers();
      } else {
        alert(data.error || 'Erro ao excluir usuário');
      }
    } catch (err) {
      alert('Erro ao excluir usuário');
    }
  };

  const handleViewPassword = async (userId: string) => {
    // Se já tem no cache, mostrar
    if (passwordCache[userId]) {
      const user = users.find(u => u.id === userId);
      setCurrentPassword({ username: user?.username || '', password: passwordCache[userId]! });
      setShowPasswordModal(true);
      return;
    }

    setLoadingPassword(userId);
    try {
      const response = await fetch(`/api/app-users/${userId}/password`);
      const data = await response.json();

      if (response.ok) {
        // Salvar no cache
        setPasswordCache(prev => ({ ...prev, [userId]: data.password }));
        setCurrentPassword({ username: data.username, password: data.password });
        setShowPasswordModal(true);
      } else {
        alert(data.error || 'Erro ao buscar senha');
      }
    } catch (err) {
      alert('Erro ao buscar senha');
    } finally {
      setLoadingPassword(null);
    }
  };

  const copyToClipboard = () => {
    if (currentPassword) {
      navigator.clipboard.writeText(currentPassword.password);
      alert('Senha copiada para a área de transferência!');
    }
  };

  // Filtrar usuários por termo de busca
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular paginação
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  // Resetar para página 1 quando filtro mudar
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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
      <Header username={username} role={userRole} userType="employee" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Usuários de Aplicação</h2>
            <div className="space-x-2">
              {isAdmin && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-johndeere-green hover:bg-johndeere-green/90 text-white px-4 py-2 rounded-lg"
                >
                  + Criar Usuário
                </button>
              )}
              {isAdmin && selectedUsers.size > 0 && (
                <>
                  <button
                    onClick={handleBulkRotate}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    🔄 Rotacionar Senhas ({selectedUsers.size})
                  </button>
                  <button
                    onClick={handleBulkDelete}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    🗑️ Excluir ({selectedUsers.size})
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Barra de Pesquisa */}
          <div className="mb-4 flex items-center space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Buscar por username, descrição ou role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-johndeere-green focus:border-transparent"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="text-sm text-gray-600">
              {filteredUsers.length} {filteredUsers.length === 1 ? 'usuário encontrado' : 'usuários encontrados'}
            </div>
          </div>

          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                {isAdmin && (
                  <th className="px-4 py-2 text-left">
                    <input
                      type="checkbox"
                      checked={selectedUsers.size === users.length && users.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                )}
                <th className="px-4 py-2 text-left">Username</th>
                <th className="px-4 py-2 text-left">Descrição</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Expira em</th>
                <th className="px-4 py-2 text-left">Última Rotação</th>
                <th className="px-4 py-2 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  {isAdmin && (
                    <td className="px-4 py-2">
                      <input
                        type="checkbox"
                        checked={selectedUsers.has(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                      />
                    </td>
                  )}
                  <td className="px-4 py-2 font-medium">{user.username}</td>
                  <td className="px-4 py-2">{user.description || '-'}</td>
                  <td className="px-4 py-2">
                    <span className="px-2 py-1 rounded text-xs bg-purple-100 text-purple-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      user.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{new Date(user.passwordExpiresAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2">
                    {user.lastRotation ? new Date(user.lastRotation).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewPassword(user.id)}
                        disabled={loadingPassword === user.id}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm disabled:bg-gray-400"
                        title="Ver Senha"
                      >
                        {loadingPassword === user.id ? '...' : '🔒'}
                      </button>
                      {isAdmin && (
                        <>
                          <button
                            onClick={() => handleEditUser(user)}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                            title="Editar"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id, user.username)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                            title="Excluir"
                          >
                            🗑️
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Mostrando {startIndex + 1} a {Math.min(endIndex, filteredUsers.length)} de {filteredUsers.length} usuários
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Anterior
                </button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                    // Mostrar apenas páginas próximas à atual
                    if (
                      page === 1 || 
                      page === totalPages || 
                      (page >= currentPage - 2 && page <= currentPage + 2)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1 rounded-lg ${
                            currentPage === page
                              ? 'bg-johndeere-green text-white'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 3 || 
                      page === currentPage + 3
                    ) {
                      return <span key={page} className="px-2">...</span>;
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Próxima →
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Criar Novo Usuário de Aplicação</h3>
            
            {generatedPassword && (
              <div className="bg-green-50 border border-green-200 p-4 rounded mb-4">
                <p className="font-semibold">Usuário criado com sucesso!</p>
                <p className="text-sm mt-2">Senha gerada (copie agora):</p>
                <code className="block bg-white p-2 rounded mt-1 text-sm">{generatedPassword}</code>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Username *</label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="app-service-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Descrição</label>
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Serviço de integração..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role *</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="ROLE_1">ROLE_1 - Dashboard Principal</option>
                  <option value="ROLE_2">ROLE_2 - Dashboard Maquinário</option>
                  <option value="ROLE_3">ROLE_3 - Dashboard Relatórios</option>
                  <option value="ROLE_4">ROLE_4 - Dashboard Administração</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-2 mt-6">
              <button
                onClick={handleCreateUser}
                className="flex-1 bg-johndeere-green hover:bg-johndeere-green/90 text-white px-4 py-2 rounded-lg"
              >
                Criar
              </button>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setGeneratedPassword('');
                  setNewUsername('');
                  setNewDescription('');
                }}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">✏️ Editar Usuário de Aplicação</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Username *</label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="app-service-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Descrição</label>
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Serviço de integração..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role *</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="ROLE_1">ROLE_1 - Dashboard Principal</option>
                  <option value="ROLE_2">ROLE_2 - Dashboard Maquinário</option>
                  <option value="ROLE_3">ROLE_3 - Dashboard Relatórios</option>
                  <option value="ROLE_4">ROLE_4 - Dashboard Administração</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status *</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="ACTIVE">ACTIVE - Ativo</option>
                  <option value="INACTIVE">INACTIVE - Inativo</option>
                  <option value="SUSPENDED">SUSPENDED - Suspenso</option>
                </select>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-3 rounded mt-4 text-sm text-blue-800">
              💡 A senha não será alterada. Use "Rotacionar Senhas" para gerar nova senha.
            </div>

            <div className="flex space-x-2 mt-6">
              <button
                onClick={handleUpdateUser}
                className="flex-1 bg-johndeere-green hover:bg-johndeere-green/90 text-white px-4 py-2 rounded-lg"
              >
                Salvar Alterações
              </button>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingUser(null);
                  setNewUsername('');
                  setNewDescription('');
                  setNewRole('ROLE_1');
                  setNewStatus('ACTIVE');
                }}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {showPasswordModal && currentPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">🔐 Senha do Usuário</h3>
            
            <div className="bg-blue-50 border border-blue-200 p-4 rounded mb-4">
              <p className="font-semibold text-blue-900">Username: {currentPassword.username}</p>
              <p className="text-sm mt-2 text-gray-700">Senha:</p>
              <div className="bg-white p-3 rounded mt-1 font-mono text-sm break-all border-2 border-blue-300">
                {currentPassword.password}
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded mb-4 text-sm text-yellow-800">
              ⚠️ Esta senha é sensível. Copie e armazene em local seguro.
            </div>

            <div className="flex space-x-2">
              <button
                onClick={copyToClipboard}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                📋 Copiar Senha
              </button>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setCurrentPassword(null);
                }}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
