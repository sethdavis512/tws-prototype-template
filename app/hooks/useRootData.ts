import { useMatches } from '@remix-run/react';

export const useRootData = () => {
    const [rootRoute] = useMatches();

    return rootRoute.data;
};
