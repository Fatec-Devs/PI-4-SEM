-- Inserir usuário admin padrão
-- Senha: root (criptografada com bcrypt ou similar)
-- Email: admin@johndeere.com
-- Matrícula: ADMIN001

-- Verificar se o grupo 'Administradores' existe, se não, criar
INSERT INTO grupo (nome) 
SELECT 'Administradores' 
WHERE NOT EXISTS (
    SELECT 1 FROM grupo WHERE nome = 'Administradores'
);

-- Inserir funcionário admin (com senha 'root' - deve ser trocada posteriormente)
INSERT INTO funcionario (matricula, nome, username, senha, email) 
SELECT 'ADMIN001', 'Administrador', 'admin@johndeere.com', 'root', 'admin@johndeere.com'
WHERE NOT EXISTS (
    SELECT 1 FROM funcionario WHERE matricula = 'ADMIN001' OR username = 'admin@johndeere.com'
);

-- Associar o admin ao grupo Administradores
INSERT INTO funcionario_grupo (matricula_funcionario, id_grupo)
SELECT 'ADMIN001', (SELECT id_grupo FROM grupo WHERE nome = 'Administradores' LIMIT 1)
WHERE NOT EXISTS (
    SELECT 1 FROM funcionario_grupo 
    WHERE matricula_funcionario = 'ADMIN001' 
    AND id_grupo = (SELECT id_grupo FROM grupo WHERE nome = 'Administradores' LIMIT 1)
);