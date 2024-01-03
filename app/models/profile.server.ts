import { Profile } from '@prisma/client';
import { prisma } from '~/db.server';

export async function getProfileById(id: Profile['id']) {
    return prisma.profile.findUnique({ where: { id } });
}
