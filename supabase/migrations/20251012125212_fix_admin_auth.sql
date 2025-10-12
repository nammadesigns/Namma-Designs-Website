-- Disable triggers temporarily
SET session_replication_role = 'replica';

-- Delete existing admin user if exists
DELETE FROM auth.users WHERE email = 'nammadesigns01@gmail.com';

-- Create admin user with proper configuration
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    confirmation_sent_at,
    is_super_admin,
    raw_app_meta_data,
    raw_user_meta_data,
    confirmation_token,
    email_confirmed,
    confirmed_at,
    recovery_sent_at,
    last_sign_in_at
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'nammadesigns01@gmail.com',
    crypt('Admin@2025', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    NOW(),
    false,
    '{"provider":"email","providers":["email"]}',
    '{"role":"admin"}',
    '',
    true,
    NOW(),
    NOW(),
    NOW()
);

-- Re-enable triggers
SET session_replication_role = 'origin';