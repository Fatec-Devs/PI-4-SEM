-- Migration: Add owner_email to application_users
-- Description: Adiciona campo para armazenar email do responsável pelo usuário de aplicação

-- Add owner_email column
ALTER TABLE johndeere.application_users 
ADD COLUMN owner_email VARCHAR(255);

-- Update existing users with a default email (você pode mudar depois)
UPDATE johndeere.application_users 
SET owner_email = 'admin@johndeere.com' 
WHERE owner_email IS NULL;

-- Make the column NOT NULL after populating
ALTER TABLE johndeere.application_users 
ALTER COLUMN owner_email SET NOT NULL;

-- Add index for better query performance
CREATE INDEX idx_application_users_owner_email ON johndeere.application_users(owner_email);

COMMENT ON COLUMN johndeere.application_users.owner_email IS 'Email do responsável pelo usuário de aplicação';
