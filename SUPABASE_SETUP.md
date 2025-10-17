# Supabase Setup Instructions

## 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login
3. Create new project
4. Wait for setup to complete

## 2. Get Project Credentials
1. Go to Project Settings → API
2. Copy your Project URL
3. Copy your anon/public key

## 3. Setup Environment Variables
1. Create `.env` file in project root
2. Add your credentials:
```
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## 4. Create Database Tables

### Works Table
```sql
CREATE TABLE works (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Feedbacks Table
```sql
CREATE TABLE feedbacks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  feedback_text TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  date TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 5. Setup Storage Bucket
1. Go to Storage in Supabase dashboard
2. Create new bucket named `works`
3. Make it public
4. Set policies:

### Storage Policy for Works Bucket
```sql
-- Allow public read access
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'works');

-- Allow public upload access
CREATE POLICY "Public upload access" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'works');
```

## 6. Row Level Security (Optional)
Enable RLS and create policies if needed:

```sql
-- Enable RLS
ALTER TABLE works ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public read access" ON works FOR SELECT USING (true);
CREATE POLICY "Public read access" ON feedbacks FOR SELECT USING (true);

-- Allow public insert access
CREATE POLICY "Public insert access" ON works FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access" ON feedbacks FOR INSERT WITH CHECK (true);

-- Allow public delete access (for admin)
CREATE POLICY "Public delete access" ON works FOR DELETE USING (true);
CREATE POLICY "Public delete access" ON feedbacks FOR DELETE USING (true);

-- Allow public update access (for admin)
CREATE POLICY "Public update access" ON feedbacks FOR UPDATE USING (true);
```

## 7. Test Connection
Run `npm run dev` and test the admin panel functionality.