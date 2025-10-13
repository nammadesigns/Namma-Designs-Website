-- Remove admin user and related auth tables
DELETE FROM auth.users WHERE email = 'nammadesigns01@gmail.com';

-- Drop admin-specific tables if they exist
DROP TABLE IF EXISTS public.contact_submissions;
DROP TABLE IF EXISTS public.customer_feedback;
DROP TABLE IF EXISTS public.visitor_analytics;