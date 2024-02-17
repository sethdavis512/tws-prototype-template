import { Session } from '@supabase/supabase-js';

export function getUserIdFromSession(session: Session) {
    return { userId: session.user.id };
}
