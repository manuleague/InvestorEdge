-- Create profiles table
create table if not exists public.profiles (
    id uuid references auth.users on delete cascade primary key,
    email text unique not null,
    full_name text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS (Row Level Security)
alter table public.profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone."
    on profiles for select
    using ( true );

create policy "Users can insert their own profile."
    on profiles for insert
    with check ( auth.uid() = id );

create policy "Users can update own profile."
    on profiles for update
    using ( auth.uid() = id );

-- Create a trigger to set updated_at on every update
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$;

create trigger on_profiles_update
    before update on public.profiles
    for each row
    execute procedure public.handle_updated_at();

-- Create a function to handle new user creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    insert into public.profiles (id, email, created_at, updated_at)
    values (new.id, new.email, now(), now());
    return new;
end;
$$;

-- Create a trigger to automatically create profile for new users
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();