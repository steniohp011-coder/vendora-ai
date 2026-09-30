-- Execute no SQL Editor do seu projeto Supabase.
create table if not exists public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 display_name text,
 credits integer not null default 5 check (credits >= 0),
 created_at timestamptz not null default now()
);
create table if not exists public.generations (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 product_name text not null,
 platform text,
 input jsonb not null default '{}'::jsonb,
 output jsonb not null,
 created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
alter table public.generations enable row level security;
create policy "Users read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "Users read own generations" on public.generations for select using (auth.uid() = user_id);
create policy "Users insert own generations" on public.generations for insert with check (auth.uid() = user_id);
create policy "Users delete own generations" on public.generations for delete using (auth.uid() = user_id);
create or replace function public.create_profile_for_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
 insert into public.profiles (id, display_name, credits) values (new.id, coalesce(new.raw_user_meta_data->>'name',''), 5);
 return new;
end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.create_profile_for_new_user();
