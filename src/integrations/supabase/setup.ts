import { supabase } from './client';

export async function setupDatabase() {
  try {
    // Create profiles table
    const { error: profilesError } = await supabase.rpc('create_profiles_table') as unknown as { error: any };
    if (profilesError) {
      console.error('Error creating profiles table:', profilesError);
    }

    // Create RLS policies for profiles
    const { error: policiesError } = await supabase.rpc('setup_profiles_policies') as unknown as { error: any };
    if (policiesError) {
      console.error('Error setting up policies:', policiesError);
    }

    console.log('Database setup completed');
  } catch (error) {
    console.error('Database setup failed:', error);
  }
}