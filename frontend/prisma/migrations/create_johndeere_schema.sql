-- Migration: Create John Deere Schema
-- Sistema John Deere - User Management System
-- Data: 2025-12-03

-- Cria schema johndeere (separado do public)
CREATE SCHEMA IF NOT EXISTS johndeere;

-- Cria enum para roles de usuários
CREATE TYPE johndeere.user_role AS ENUM ('ADMIN', 'COMUM');

-- Cria enum para status
CREATE TYPE johndeere.user_status AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- Tabela de Funcionários (Employees)
CREATE TABLE johndeere.employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    matricula VARCHAR(50) UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    role johndeere.user_role DEFAULT 'COMUM',
    status johndeere.user_status DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- Tabela de Times (Teams)
CREATE TABLE johndeere.teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) UNIQUE NOT NULL,
    descricao TEXT,
    pdl VARCHAR(255),
    status johndeere.user_status DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de relacionamento Many-to-Many entre Employees e Teams
CREATE TABLE johndeere.employee_teams (
    employee_id UUID REFERENCES johndeere.employees(id) ON DELETE CASCADE,
    team_id UUID REFERENCES johndeere.teams(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (employee_id, team_id)
);

-- Tabela de Usuários de Aplicação (Application Users)
CREATE TABLE johndeere.application_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE NOT NULL,
    matricula VARCHAR(50) UNIQUE NOT NULL,
    team_id UUID NOT NULL REFERENCES johndeere.teams(id),
    aws_secret_arn TEXT,
    password_created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    password_expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    must_change_password BOOLEAN DEFAULT FALSE,
    status johndeere.user_status DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by_id UUID NOT NULL REFERENCES johndeere.employees(id),
    last_password_rotation TIMESTAMP WITH TIME ZONE
);

-- Tabela de Histórico de Senhas
CREATE TABLE johndeere.password_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    app_user_id UUID NOT NULL REFERENCES johndeere.application_users(id) ON DELETE CASCADE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Auditoria
CREATE TABLE johndeere.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id VARCHAR(255) NOT NULL,
    performed_by VARCHAR(255) NOT NULL,
    performed_by_type VARCHAR(50) NOT NULL,
    details TEXT,
    ip_address VARCHAR(100),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhorar performance
CREATE INDEX idx_employees_username ON johndeere.employees(username);
CREATE INDEX idx_employees_email ON johndeere.employees(email);
CREATE INDEX idx_employees_status ON johndeere.employees(status);
CREATE INDEX idx_teams_nome ON johndeere.teams(nome);
CREATE INDEX idx_app_users_username ON johndeere.application_users(username);
CREATE INDEX idx_app_users_team_id ON johndeere.application_users(team_id);
CREATE INDEX idx_app_users_expires ON johndeere.application_users(password_expires_at);
CREATE INDEX idx_password_history_user ON johndeere.password_history(app_user_id);
CREATE INDEX idx_audit_action ON johndeere.audit_logs(action);
CREATE INDEX idx_audit_entity ON johndeere.audit_logs(entity_type);
CREATE INDEX idx_audit_created ON johndeere.audit_logs(created_at);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION johndeere.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
CREATE TRIGGER update_employees_updated_at BEFORE UPDATE ON johndeere.employees
    FOR EACH ROW EXECUTE FUNCTION johndeere.update_updated_at_column();

CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON johndeere.teams
    FOR EACH ROW EXECUTE FUNCTION johndeere.update_updated_at_column();

CREATE TRIGGER update_app_users_updated_at BEFORE UPDATE ON johndeere.application_users
    FOR EACH ROW EXECUTE FUNCTION johndeere.update_updated_at_column();

-- Comentários nas tabelas
COMMENT ON SCHEMA johndeere IS 'Schema dedicado ao sistema de gerenciamento de usuários John Deere';
COMMENT ON TABLE johndeere.employees IS 'Funcionários com acesso ao sistema (Admin e Comum)';
COMMENT ON TABLE johndeere.teams IS 'Times/Equipes da organização';
COMMENT ON TABLE johndeere.employee_teams IS 'Relacionamento Many-to-Many entre funcionários e times';
COMMENT ON TABLE johndeere.application_users IS 'Usuários de aplicação para integrações entre sistemas';
COMMENT ON TABLE johndeere.password_history IS 'Histórico de senhas dos usuários de aplicação';
COMMENT ON TABLE johndeere.audit_logs IS 'Registro de auditoria de todas as operações';
