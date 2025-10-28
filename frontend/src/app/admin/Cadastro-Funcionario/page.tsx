"use client";

import { useState } from 'react';

export default function CadastroFuncionario() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cargo: '',
    departamento: '',
    telefone: '',
    senha: '',
    confirmarSenha: '',
    nivelAcesso: 'usuario'
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.nome.trim()) {
      errors.nome = "Nome é obrigatório";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email é obrigatório";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email inválido";
      isValid = false;
    }

    if (!formData.cargo.trim()) {
      errors.cargo = "Cargo é obrigatório";
      isValid = false;
    }

    if (!formData.departamento.trim()) {
      errors.departamento = "Departamento é obrigatório";
      isValid = false;
    }

    if (!formData.senha) {
      errors.senha = "Senha é obrigatória";
      isValid = false;
    } else if (formData.senha.length < 6) {
      errors.senha = "A senha deve ter pelo menos 6 caracteres";
      isValid = false;
    }

    if (formData.senha !== formData.confirmarSenha) {
      errors.confirmarSenha = "As senhas não coincidem";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulação de envio para API
      try {
        // Aqui seria a chamada real para a API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setSubmitSuccess(true);
        setFormData({
          nome: '',
          email: '',
          cargo: '',
          departamento: '',
          telefone: '',
          senha: '',
          confirmarSenha: '',
          nivelAcesso: 'usuario'
        });
        
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 3000);
      } catch (error) {
        console.error("Erro ao cadastrar funcionário:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Cadastro de Funcionários</h1>
      </div>

      {submitSuccess && (
        <div className="bg-green-50 border-l-4 border-johndeere-green p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-johndeere-green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                Funcionário cadastrado com sucesso!
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nome */}
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                Nome Completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-johndeere-green focus:ring focus:ring-johndeere-green focus:ring-opacity-50 ${formErrors.nome ? 'border-red-500' : ''}`}
              />
              {formErrors.nome && <p className="mt-1 text-sm text-red-600">{formErrors.nome}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-johndeere-green focus:ring focus:ring-johndeere-green focus:ring-opacity-50 ${formErrors.email ? 'border-red-500' : ''}`}
              />
              {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
            </div>

            {/* Cargo */}
            <div>
              <label htmlFor="cargo" className="block text-sm font-medium text-gray-700">
                Cargo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="cargo"
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-johndeere-green focus:ring focus:ring-johndeere-green focus:ring-opacity-50 ${formErrors.cargo ? 'border-red-500' : ''}`}
              />
              {formErrors.cargo && <p className="mt-1 text-sm text-red-600">{formErrors.cargo}</p>}
            </div>

            {/* Departamento */}
            <div>
              <label htmlFor="departamento" className="block text-sm font-medium text-gray-700">
                Departamento <span className="text-red-500">*</span>
              </label>
              <select
                id="departamento"
                name="departamento"
                value={formData.departamento}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-johndeere-green focus:ring focus:ring-johndeere-green focus:ring-opacity-50 ${formErrors.departamento ? 'border-red-500' : ''}`}
              >
                <option value="">Selecione um departamento</option>
                <option value="Operações">Operações</option>
                <option value="Manutenção">Manutenção</option>
                <option value="Administrativo">Administrativo</option>
                <option value="Tecnologia">Tecnologia</option>
                <option value="Recursos Humanos">Recursos Humanos</option>
              </select>
              {formErrors.departamento && <p className="mt-1 text-sm text-red-600">{formErrors.departamento}</p>}
            </div>

            {/* Telefone */}
            <div>
              <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
                Telefone
              </label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-johndeere-green focus:ring focus:ring-johndeere-green focus:ring-opacity-50"
                placeholder="(00) 00000-0000"
              />
            </div>

            {/* Nível de Acesso */}
            <div>
              <label htmlFor="nivelAcesso" className="block text-sm font-medium text-gray-700">
                Nível de Acesso <span className="text-red-500">*</span>
              </label>
              <select
                id="nivelAcesso"
                name="nivelAcesso"
                value={formData.nivelAcesso}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-johndeere-green focus:ring focus:ring-johndeere-green focus:ring-opacity-50"
              >
                <option value="usuario">Usuário</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
                Senha <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-johndeere-green focus:ring focus:ring-johndeere-green focus:ring-opacity-50 ${formErrors.senha ? 'border-red-500' : ''}`}
              />
              {formErrors.senha && <p className="mt-1 text-sm text-red-600">{formErrors.senha}</p>}
            </div>

            {/* Confirmar Senha */}
            <div>
              <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-700">
                Confirmar Senha <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-johndeere-green focus:ring focus:ring-johndeere-green focus:ring-opacity-50 ${formErrors.confirmarSenha ? 'border-red-500' : ''}`}
              />
              {formErrors.confirmarSenha && <p className="mt-1 text-sm text-red-600">{formErrors.confirmarSenha}</p>}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-johndeere-green"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-johndeere-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-johndeere-green disabled:opacity-50"
            >
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar Funcionário'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}