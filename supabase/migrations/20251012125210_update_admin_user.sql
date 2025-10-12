-- First, delete the existing admin user
DELETE FROM auth.users WHERE email = 'nammadesigns01@gmail.com';

-- Re-create the admin user with a new password
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
  confirmation_token,
  email_change_token_current,
  email_change,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  confirmed_at
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'nammadesigns01@gmail.com',
  crypt('Namma@1925', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"is_admin":true}',
  FALSE,
  NOW()
);