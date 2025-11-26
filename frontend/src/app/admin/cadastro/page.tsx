"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CadastroFuncionario() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cargo: '',
    departamento: '',
    senha: '',
    confirmarSenha: ''
  });
  
  const [errors, setErrors] = useState({
    nome: '',
    email: '',
    cargo: '',
    departamento: '',
    senha: '',
    confirmarSenha: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpar erro quando o usuário começa a digitar
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    // Validar nome
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
      isValid = false;
    }
    
    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
      isValid = false;
    }
    
    // Validar cargo
    if (!formData.cargo.trim()) {
      newErrors.cargo = 'Cargo é obrigatório';
      isValid = false;
    }
    
    // Validar departamento
    if (!formData.departamento.trim()) {
      newErrors.departamento = 'Departamento é obrigatório';
      isValid = false;
    }
    
    // Validar senha
    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória';
      isValid = false;
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'A senha deve ter pelo menos 6 caracteres';
      isValid = false;
    }
    
    // Validar confirmação de senha
    if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = 'As senhas não coincidem';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Aqui seria feita a chamada à API para cadastrar o funcionário
      console.log('Dados do formulário:', formData);
      alert('Funcionário cadastrado com sucesso!');
      router.push('/admin/funcionarios');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-4">
        <div className="h-12 w-12">
          <img 
            src="/john-deere-logo.png" 
            alt="John Deere Logo" 
            className="h-12 w-auto rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-johndeere-green">Cadastro de Funcionário</h1>
          <p className="text-gray-600">Preencha os dados para cadastrar um novo funcionário no sistema John Deere</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nome */}
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-johndeere-green focus:border-johndeere-green ${
                  errors.nome ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Digite o nome completo"
              />
              {errors.nome && <p className="mt-1 text-sm text-red-600">{errors.nome}</p>}
            </div>
            
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-johndeere-green focus:border-johndeere-green ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="email@exemplo.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            
            {/* Cargo */}
            <div>
              <label htmlFor="cargo" className="block text-sm font-medium text-gray-700 mb-1">
                Cargo
              </label>
              <select
                id="cargo"
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-johndeere-green focus:border-johndeere-green ${
                  errors.cargo ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Selecione um cargo</option>
                <option value="gerente">Gerente</option>
                <option value="supervisor">Supervisor</option>
                <option value="analista">Analista</option>
                <option value="tecnico">Técnico</option>
                <option value="operador">Operador</option>
              </select>
              {errors.cargo && <p className="mt-1 text-sm text-red-600">{errors.cargo}</p>}
            </div>
            
            {/* Departamento */}
            <div>
              <label htmlFor="departamento" className="block text-sm font-medium text-gray-700 mb-1">
                Departamento
              </label>
              <select
                id="departamento"
                name="departamento"
                value={formData.departamento}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-johndeere-green focus:border-johndeere-green ${
                  errors.departamento ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Selecione um departamento</option>
                <option value="producao">Produção</option>
                <option value="manutencao">Manutenção</option>
                <option value="qualidade">Qualidade</option>
                <option value="logistica">Logística</option>
                <option value="administrativo">Administrativo</option>
              </select>
              {errors.departamento && <p className="mt-1 text-sm text-red-600">{errors.departamento}</p>}
            </div>
            
            {/* Senha */}
            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-johndeere-green focus:border-johndeere-green ${
                  errors.senha ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="••••••••"
              />
              {errors.senha && <p className="mt-1 text-sm text-red-600">{errors.senha}</p>}
            </div>
            
            {/* Confirmar Senha */}
            <div>
              <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Senha
              </label>
              <input
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-johndeere-green focus:border-johndeere-green ${
                  errors.confirmarSenha ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="••••••••"
              />
              {errors.confirmarSenha && <p className="mt-1 text-sm text-red-600">{errors.confirmarSenha}</p>}
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-johndeere-green text-white rounded-md hover:bg-johndeere-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-johndeere-yellow transition-all shadow-sm"
            >
              Cadastrar Funcionário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}