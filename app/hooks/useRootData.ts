import { useMatches } from '@remix-run/react';
import { Session } from '@supabase/supabase-js';
import { Theme } from '~/utils/theme-provider';

interface UseRootDataResponse {
    domainUrl: string;
    env: {
        SUPABASE_URL: string;
        SUPABASE_ANON_KEY: string;
    };
    theme: Theme;
    isLoggedIn: boolean;
    serverSession: Session | null;
}

export const useRootData = () => {
    const [rootRoute] = useMatches();
    console.log({ 'rootRoute.data': rootRoute.data });

    return rootRoute.data as UseRootDataResponse;
};
