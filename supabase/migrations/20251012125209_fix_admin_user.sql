-- Create admin user directly in the auth.users table
INSERT INTO auth.users (
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  confirmed_at
)
SELECT 
  'nammadesigns01@gmail.com',
  crypt('NammaDesignsS@1925', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{}',
  true,
  now()
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'nammadesigns01@gmail.com'
);

-- Ensure the user has the authenticated role
INSERT INTO auth.identities (
  provider_id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
)
SELECT
  'nammadesigns01@gmail.com',
  (SELECT id FROM auth.users WHERE email = 'nammadesigns01@gmail.com'),
  jsonb_build_object('sub', 'nammadesigns01@gmail.com'),
  'email',
  now(),
  now(),
  now()
WHERE NOT EXISTS (
  SELECT 1 FROM auth.identities 
  WHERE provider_id = 'nammadesigns01@gmail.com'
);