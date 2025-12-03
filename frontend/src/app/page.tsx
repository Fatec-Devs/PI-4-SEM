'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-johndeere-green p-4">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="inline-flex w-32 h-32 rounded-3xl mb-6 shadow-2xl overflow-hidden">
            <img src="/john-deere-logo.png" alt="John Deere" className="w-full h-full object-cover scale-110" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            John Deere
          </h1>
          <p className="text-johndeere-yellow font-semibold">Sistema de Gerenciamento de Usuários</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => router.push('/login/employee')}
            className="w-full bg-white hover:bg-gray-50 text-johndeere-green font-semibold py-4 px-6 rounded-lg transition duration-200 shadow-lg"
          >
            Login de Funcionário
          </button>

          <button
            onClick={() => router.push('/login/application')}
            className="w-full bg-johndeere-yellow hover:bg-johndeere-yellow/90 text-gray-900 font-semibold py-4 px-6 rounded-lg transition duration-200 shadow-lg"
          >
            Login de Aplicação
          </button>
        </div>
      </div>
    </div>
  );
}
