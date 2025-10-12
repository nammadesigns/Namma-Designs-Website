-- First, delete any existing admin users to avoid conflicts
DELETE FROM auth.users WHERE email = 'nammadesigns01@gmail.com';

-- Create the admin user with raw SQL to ensure proper password hashing
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
    is_super_admin,
    raw_app_meta_data,
    raw_user_meta_data,
    confirmed_at
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'nammadesigns01@gmail.com',
    crypt('Admin@2025', gen_salt('bf')),
    now(),
    now(),
    now(),
    false,
    '{"provider": "email", "providers": ["email"], "role": "admin"}',
    '{"role": "admin"}',
    now()
);

-- Grant necessary permissions
ALTER USER authenticator NOINHERIT;