import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'generated-db-types';

export async function createProfile({
    client,
    userId,
    username,
    firstName,
    lastName
}: {
    client: SupabaseClient<Database>;
    userId: string;
    username: string;
    firstName: string;
    lastName: string;
}) {
    const { data, error } = await client
        .from('profiles')
        .insert({
            user_id: userId,
            username,
            first_name: firstName,
            last_name: lastName
        })
        .select();

    return { data, error };
}

export async function getProfileByUsername({
    client,
    username
}: {
    client: SupabaseClient<Database>;
    username: string;
}) {
    const { data, error } = await client
        .from('profiles')
        .select('*')
        .eq('username', username);

    return { data, error };
}
