-- Create visitor analytics table
CREATE TABLE public.visitor_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visited_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  page_path TEXT NOT NULL,
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create services table for dynamic service management
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create customer feedback table
CREATE TABLE public.customer_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback_text TEXT NOT NULL,
  is_approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact submissions table
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.visitor_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public policies for visitor tracking and viewing services
CREATE POLICY "Anyone can insert visitor analytics"
ON public.visitor_analytics
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Anyone can view active services"
ON public.services
FOR SELECT
TO anon, authenticated
USING (is_active = true);

CREATE POLICY "Anyone can view approved feedback"
ON public.customer_feedback
FOR SELECT
TO anon, authenticated
USING (is_approved = true);

CREATE POLICY "Anyone can submit contact form"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Insert default services
INSERT INTO public.services (title, description, icon_name, display_order) VALUES
('Branding', 'Crafting unique brand identities that stand out and tell your story.', 'award', 1),
('Marketing Design', 'Engaging designs for flyers, brochures, and ads that drive results.', 'bar-chart-2', 2),
('Social Media Design', 'Eye-catching posts, stories, and covers for your social channels.', 'instagram', 3),
('Invitation Cards', 'Beautiful and custom invitations for any special occasion.', 'mail', 4),
('Presentation Slides', 'Professional and compelling slides for your presentations.', 'airplay', 5),
('Custom Design', 'Have a custom design need? We''re here to help bring it to life.', 'plus-circle', 6);

-- Insert sample feedback
INSERT INTO public.customer_feedback (customer_name, rating, feedback_text, is_approved) VALUES
('Rajesh Kumar', 5, 'Amazing work! They transformed my brand identity completely. Highly professional and creative.', true),
('Priya Sharma', 5, 'Best value for money! The designs are stunning and delivery was super fast.', true),
('Amit Patel', 5, 'Very affordable prices compared to other agencies. Quality is outstanding!', true);

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for automatic timestamp updates
CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_customer_feedback_updated_at
BEFORE UPDATE ON public.customer_feedback
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();