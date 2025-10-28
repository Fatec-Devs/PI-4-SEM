"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function CadastroFuncionario() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    role: '',
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulação de envio para API
    console.log("Dados do formulário:", formData);
    alert("Funcionário cadastrado com sucesso!");
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-border-light dark:border-border-dark px-10 py-3 bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center gap-4 text-text-dark dark:text-text-light">
          <div className="h-10 w-10">
            <img 
              src="/john-deere-logo.png" 
              alt="John Deere Logo" 
              className="h-13 w-auto rounded-lg"
            />
          </div>
          <h2 className="text-xl font-bold text-johndeere-green">John Deere</h2>
        </div>
        <div className="flex flex-1 justify-end items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium text-text-dark dark:text-text-light hover:text-johndeere-green dark:hover:text-johndeere-yellow transition-colors">
              Início
            </Link>
            <Link href="#" className="text-sm font-medium text-text-dark dark:text-text-light hover:text-johndeere-green dark:hover:text-johndeere-yellow transition-colors">
              Usuários
            </Link>
            <Link href="#" className="text-sm font-medium text-text-dark dark:text-text-light hover:text-johndeere-green dark:hover:text-johndeere-yellow transition-colors">
              Funções
            </Link>
            <Link href="#" className="text-sm font-medium text-text-dark dark:text-text-light hover:text-johndeere-green dark:hover:text-johndeere-yellow transition-colors">
              Permissões
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <button className="flex items-center justify-center rounded-full size-10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <img 
              src="/globe.svg" 
              alt="Avatar" 
              className="size-10 rounded-full object-cover"
            />
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex justify-center py-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-text-dark dark:text-text-light">Cadastro de Funcionário</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Preencha os campos abaixo para criar um novo perfil de funcionário. Campos com <span className="text-red-500">*</span> são obrigatórios.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <fieldset className="space-y-6 border-b border-border-light dark:border-border-dark pb-8">
              <legend className="text-lg font-semibold text-johndeere-green">Informações Pessoais</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 pb-2 after:content-['*'] after:text-red-500 after:ml-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Ex: João da Silva"
                    required
                    className="w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-johndeere-yellow focus:border-johndeere-green border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 pb-2 after:content-['*'] after:text-red-500 after:ml-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Ex: joao.silva@deere.com"
                    required
                    className="w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-johndeere-yellow focus:border-johndeere-green border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Use o e-mail corporativo.</p>
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 pb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Ex: (11) 99999-9999"
                  className="w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-johndeere-yellow focus:border-johndeere-green border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </fieldset>
            
            <fieldset className="space-y-6 border-b border-border-light dark:border-border-dark pb-8">
              <legend className="text-lg font-semibold text-johndeere-green">Informações Profissionais</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 pb-2 after:content-['*'] after:text-red-500 after:ml-1">
                    Departamento
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-johndeere-yellow focus:border-johndeere-green border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Selecione o Departamento</option>
                    <option value="Engenharia">Engenharia</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Vendas">Vendas</option>
                    <option value="Recursos Humanos">Recursos Humanos</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 pb-2 after:content-['*'] after:text-red-500 after:ml-1">
                    Função
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-johndeere-yellow focus:border-johndeere-green border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Selecione a Função</option>
                    <option value="Gerente">Gerente</option>
                    <option value="Desenvolvedor">Desenvolvedor</option>
                    <option value="Designer">Designer</option>
                    <option value="Analista">Analista</option>
                  </select>
                </div>
              </div>
            </fieldset>
            
            <fieldset className="space-y-6">
              <legend className="text-lg font-semibold text-johndeere-green">Credenciais de Acesso</legend>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 pb-2 after:content-['*'] after:text-red-500 after:ml-1">
                  Nome de Usuário
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="material-symbols-outlined text-gray-400">person</span>
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Ex: joao.silva"
                    required
                    className="w-full rounded-md pl-10 focus:ring focus:ring-opacity-50 focus:ring-johndeere-yellow focus:border-johndeere-green border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Será usado para login no sistema.</p>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 pb-2 after:content-['*'] after:text-red-500 after:ml-1">
                  Senha
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="material-symbols-outlined text-gray-400">lock</span>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Crie uma senha forte"
                    required
                    className="w-full rounded-md pl-10 focus:ring focus:ring-opacity-50 focus:ring-johndeere-yellow focus:border-johndeere-green border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Mínimo de 8 caracteres, com letras, números e símbolos.</p>
              </div>
            </fieldset>
            
            <div className="flex justify-end pt-4 gap-4">
              <button 
                type="button" 
                className="w-full sm:w-auto flex justify-center py-2 px-6 rounded-md bg-gray-200 text-text-dark dark:bg-gray-600 dark:text-text-light font-bold text-sm hover:bg-gray-300 dark:hover:bg-gray-500 transition-all"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="w-full sm:w-auto flex items-center justify-center py-2 px-6 rounded-md bg-johndeere-green text-white font-bold text-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-johndeere-yellow transition-all shadow-sm"
              >
                <span className="material-symbols-outlined mr-2">person_add</span>
                Cadastrar Funcionário
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}