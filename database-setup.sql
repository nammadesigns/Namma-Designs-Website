-- Create tables
CREATE TABLE IF NOT EXISTS works (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS feedbacks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  feedback_text TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  date TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE works ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;

-- Create policies for works table
CREATE POLICY "Enable read access for all users" ON works FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON works FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable delete access for all users" ON works FOR DELETE USING (true);

-- Create policies for feedbacks table
CREATE POLICY "Enable read access for all users" ON feedbacks FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON feedbacks FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable delete access for all users" ON feedbacks FOR DELETE USING (true);
CREATE POLICY "Enable update access for all users" ON feedbacks FOR UPDATE USING (true);

-- Storage policies (run these in Storage > Policies section)
-- CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id = 'works');
-- CREATE POLICY "Public upload access" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'works');
-- CREATE POLICY "Public delete access" ON storage.objects FOR DELETE USING (bucket_id = 'works');