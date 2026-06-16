create table contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text,
  email text,
  phone text,
  interest text,
  message text,
  created_at timestamp default now()
);
