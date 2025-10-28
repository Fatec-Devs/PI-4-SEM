"use client";

import Link from 'next/link';

export default function UserHomePage() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white dark:bg-background-dark border-r border-gray-200 dark:border-subtle-dark flex flex-col p-4">
        <div className="flex items-center gap-2 mb-10">
          <img 
            alt="John Deere Logo" 
            className="h-10 w-auto rounded-lg" 
            src="/john-deere-logo.png"
          />
          <h1 className="text-xl font-bold text-foreground-light dark:text-foreground-dark">John Deere</h1>
        </div>
        <nav className="flex-1 flex flex-col gap-2">
          <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary-green/10 dark:bg-primary-green/20 text-primary-green dark:text-accent-yellow font-bold">
            <span className="material-symbols-outlined">dashboard</span>
            <span>Visão Geral</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-subtle-light/50 dark:hover:bg-subtle-dark/50 text-foreground-light dark:text-foreground-dark">
            <span className="material-symbols-outlined">agriculture</span>
            <span>Equipamentos</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-subtle-light/50 dark:hover:bg-subtle-dark/50 text-foreground-light dark:text-foreground-dark">
            <span className="material-symbols-outlined">task_alt</span>
            <span>Tarefas</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-subtle-light/50 dark:hover:bg-subtle-dark/50 text-foreground-light dark:text-foreground-dark">
            <span className="material-symbols-outlined">notifications</span>
            <span>Alertas</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-subtle-light/50 dark:hover:bg-subtle-dark/50 text-foreground-light dark:text-foreground-dark">
            <span className="material-symbols-outlined">settings</span>
            <span>Configurações</span>
          </Link>
        </nav>
        <div className="mt-auto flex flex-col gap-4">
          <button className="flex w-full items-center justify-center rounded-lg h-12 px-4 bg-primary-green text-white dark:text-foreground-dark font-bold text-sm tracking-wide shadow-lg hover:bg-primary-green/90 transition-all duration-300 ease-in-out">
            <span className="material-symbols-outlined mr-2">add_circle</span>
            <span>Adicionar Equipamento</span>
          </button>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-subtle-light/50 dark:hover:bg-subtle-dark/50 text-foreground-light dark:text-foreground-dark text-sm">
            <span className="material-symbols-outlined">help_outline</span>
            <span>Ajuda e Suporte</span>
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-8 bg-gray-50 dark:bg-background-dark/50">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-primary-green dark:text-accent-yellow">Painel do Operador</h1>
            <p className="text-foreground-light/70 dark:text-foreground-dark/70 mt-1">Bem-vindo de volta, aqui está um resumo da sua operação.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative">
              <span className="material-symbols-outlined text-3xl text-foreground-light/80 dark:text-foreground-dark/80">notifications</span>
              <span className="absolute top-0 right-0 h-2 w-2 bg-status-red rounded-full"></span>
            </button>
            <div className="flex items-center gap-3">
            <img src="/globe.svg" alt="Avatar" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="font-semibold text-foreground-light dark:text-foreground-dark">João Silva</p>
                <p className="text-sm text-foreground-light/60 dark:text-foreground-dark/60">Operador</p>
              </div>
            </div>
          </div>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-subtle-dark p-6 rounded-xl shadow-md flex items-center gap-4">
            <div className="p-3 rounded-full bg-status-green/10">
              <span className="material-symbols-outlined text-3xl text-status-green">check_circle</span>
            </div>
            <div>
              <p className="text-sm text-foreground-light/70 dark:text-foreground-dark/70">Equipamentos Ativos</p>
              <p className="text-2xl font-bold text-foreground-light dark:text-foreground-dark">1</p>
            </div>
          </div>
          <div className="bg-white dark:bg-subtle-dark p-6 rounded-xl shadow-md flex items-center gap-4">
            <div className="p-3 rounded-full bg-status-yellow/10">
              <span className="material-symbols-outlined text-3xl text-status-yellow">build</span>
            </div>
            <div>
              <p className="text-sm text-foreground-light/70 dark:text-foreground-dark/70">Em Manutenção</p>
              <p className="text-2xl font-bold text-foreground-light dark:text-foreground-dark">1</p>
            </div>
          </div>
          <div className="bg-white dark:bg-subtle-dark p-6 rounded-xl shadow-md flex items-center gap-4">
            <div className="p-3 rounded-full bg-status-red/10">
              <span className="material-symbols-outlined text-3xl text-status-red">warning</span>
            </div>
            <div>
              <p className="text-sm text-foreground-light/70 dark:text-foreground-dark/70">Alertas Críticos</p>
              <p className="text-2xl font-bold text-foreground-light dark:text-foreground-dark">1</p>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground-light dark:text-foreground-dark mb-4">Status do Equipamento</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-subtle-dark rounded-xl shadow-md overflow-hidden flex flex-col">
              <div className="h-48 bg-no-repeat bg-center bg-contain" style={{backgroundImage: `url('/8400r_campo_large_7b13780a09551c33c057712d2c40f25f24c91db8.webp')`}}></div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-foreground-light dark:text-foreground-dark">John Deere 8400R</h3>
                  <span className="inline-flex items-center gap-1.5 bg-status-green/10 text-status-green text-xs font-semibold px-2.5 py-1 rounded-full">
                    <span className="h-1.5 w-1.5 bg-status-green rounded-full"></span>
                    Em Operação
                  </span>
                </div>
                <p className="text-foreground-light/70 dark:text-foreground-dark/70 text-sm mb-4">
                  <span className="material-symbols-outlined text-sm align-middle mr-1">location_on</span> 
                  Fazenda do Sul, Campo Grande
                </p>
                <div className="mt-auto grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-foreground-light/60 dark:text-foreground-dark/60">Horas de Uso</p>
                    <p className="font-bold text-lg">1,250h</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground-light/60 dark:text-foreground-dark/60">Combustível</p>
                    <p className="font-bold text-lg">85%</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground-light/60 dark:text-foreground-dark/60">Óleo</p>
                    <p className="font-bold text-lg text-status-red">Baixo</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-subtle-dark rounded-xl shadow-md overflow-hidden flex flex-col">
              <div className="h-48 bg-no-repeat bg-center bg-contain" style={{backgroundImage: `url('/S790.PNG')`}}></div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-foreground-light dark:text-foreground-dark">John Deere S790</h3>
                  <span className="inline-flex items-center gap-1.5 bg-status-yellow/10 text-status-yellow text-xs font-semibold px-2.5 py-1 rounded-full">
                    <span className="h-1.5 w-1.5 bg-status-yellow rounded-full"></span>
                    Em Manutenção
                  </span>
                </div>
                <p className="text-foreground-light/70 dark:text-foreground-dark/70 text-sm mb-4">
                  <span className="material-symbols-outlined text-sm align-middle mr-1">calendar_today</span> 
                  Próxima manutenção em 30 dias
                </p>
                <div className="mt-auto grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-foreground-light/60 dark:text-foreground-dark/60">Horas de Uso</p>
                    <p className="font-bold text-lg">2,500h</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground-light/60 dark:text-foreground-dark/60">Filtro de Ar</p>
                    <p className="font-bold text-lg text-status-yellow">Verificar</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground-light/60 dark:text-foreground-dark/60">Status</p>
                    <p className="font-bold text-lg">Aguardando Peça</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground-light dark:text-foreground-dark mb-4">Alertas Recentes</h2>
          <div className="bg-white dark:bg-subtle-dark rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground-light dark:text-foreground-dark">Alertas do Sistema</h3>
              <Link href="#" className="text-sm text-johndeere-green hover:underline">
                Ver todos
              </Link>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-status-red/5 rounded-lg border border-status-red/20">
                <div className="p-2 rounded-full bg-status-red/10">
                  <span className="material-symbols-outlined text-xl text-status-red">warning</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground-light dark:text-foreground-dark">Nível de óleo baixo</h4>
                  <p className="text-sm text-foreground-light/70 dark:text-foreground-dark/70">John Deere 8400R precisa de manutenção urgente.</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-foreground-light/50 dark:text-foreground-dark/50">Hoje, 09:45</span>
                    <span className="inline-flex items-center gap-1 bg-status-red/10 text-status-red text-xs px-2 py-0.5 rounded-full">
                      Urgente
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}