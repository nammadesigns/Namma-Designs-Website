-- Enable the pgcrypto extension for password hashing
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create admin user
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
  crypt('NammaDesignsS@1925', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  FALSE,
  NOW()
);

-- Create policy to allow authenticated users to read all contact submissions
CREATE POLICY "Allow authenticated users to read all submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (true);