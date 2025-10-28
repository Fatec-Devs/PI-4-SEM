"use client";

import Link from 'next/link';

export default function UserHomePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Meu Painel</h1>
        <div className="text-sm text-gray-500">
          Bem-vindo, João Silva. Aqui está o resumo dos seus equipamentos.
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-johndeere-green">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-johndeere-green" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Meus Equipamentos</p>
              <p className="text-2xl font-bold text-gray-800">2</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-400">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Tarefas Pendentes</p>
              <p className="text-2xl font-bold text-gray-800">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Alertas</p>
              <p className="text-2xl font-bold text-gray-800">1</p>
            </div>
          </div>
        </div>
      </div>

      {/* My Equipment */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">Meus Equipamentos</h2>
        </div>
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="relative">
              <img 
                src="https://www.deere.com/assets/images/region-4/products/tractors/row-crop-tractors/7r-210-tractor/7r_r4g013321_rrd_large_a4a7e55e7f9b551c0f9ed3d9ae3f98a9bb4e95bc.jpg" 
                alt="Trator Modelo X500" 
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Em Operação
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-800">Trator Modelo X500</h3>
              <p className="text-sm text-gray-500 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Fazenda do Sul, Campo Grande
              </p>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-xs text-gray-500">Horas de Uso</p>
                  <p className="font-medium">1,250h</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Produtividade</p>
                  <p className="font-medium">85%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Óleo</p>
                  <p className="font-medium text-red-500">Baixo</p>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/UserAPP/equipamentos/1" className="text-sm text-johndeere-green hover:underline">
                  Ver detalhes
                </Link>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="relative">
              <img 
                src="https://www.deere.com/assets/images/region-4/products/harvesting/s700-combine-harvester/s770-combine/r4d066892_s770_combine_large_f9c5a6c1e8b9c9b9c7a0e2b1a0c9c9c9.jpg" 
                alt="Colheitadeira S770" 
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                Em Manutenção
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-800">Colheitadeira S770</h3>
              <p className="text-sm text-gray-500 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Próxima manutenção em 30 dias
              </p>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-xs text-gray-500">Horas de Uso</p>
                  <p className="font-medium">2,500h</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Filtro de Ar</p>
                  <p className="font-medium text-yellow-500">Verificar</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <p className="font-medium">Aguardando Peça</p>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/UserAPP/equipamentos/2" className="text-sm text-johndeere-green hover:underline">
                  Ver detalhes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">Minhas Tarefas</h2>
          <Link href="/UserAPP/tarefas" className="text-sm text-johndeere-green hover:underline">
            Ver todas
          </Link>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 relative mt-1">
                <input type="checkbox" className="absolute h-5 w-5 opacity-0 cursor-pointer z-10" />
                <div className="border border-gray-300 rounded h-5 w-5"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">Verificar nível de óleo do Trator Modelo X500</p>
                <p className="text-xs text-gray-500 mt-1">Prazo: 30 de Julho, 2024</p>
              </div>
              <div className="ml-auto">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Urgente
                </span>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 relative mt-1">
                <input type="checkbox" className="absolute h-5 w-5 opacity-0 cursor-pointer z-10" />
                <div className="border border-gray-300 rounded h-5 w-5"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">Substituir filtro de ar da Colheitadeira S770</p>
                <p className="text-xs text-gray-500 mt-1">Prazo: 25 de Julho, 2024</p>
              </div>
              <div className="ml-auto">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Média
                </span>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 relative mt-1">
                <input type="checkbox" className="absolute h-5 w-5 opacity-0 cursor-pointer z-10" />
                <div className="border border-gray-300 rounded h-5 w-5"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">Agendar manutenção preventiva para o próximo mês</p>
                <p className="text-xs text-gray-500 mt-1">Prazo: 5 de Agosto, 2024</p>
              </div>
              <div className="ml-auto">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Baixa
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alert */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">Alertas Recentes</h2>
          <Link href="/UserAPP/alertas" className="text-sm text-johndeere-green hover:underline">
            Ver todos
          </Link>
        </div>
        <div className="p-6">
          <div className="border-l-4 border-red-500 bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Nível de óleo baixo no Trator Modelo X500</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>25 de Julho, 2024 · Crítico</p>
                  <p className="mt-1">O nível de óleo está abaixo do recomendado. Verifique e complete o nível o mais rápido possível para evitar danos ao motor.</p>
                </div>
                <div className="mt-3">
                  <button type="button" className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Marcar como resolvido
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}