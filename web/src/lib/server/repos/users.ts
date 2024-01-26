import type { TermType } from "$lib";
import prisma from "$lib/server/prisma";

export const findUsersByTerm = async ({ term = '' }: TermType) => {
  return await prisma.user.findMany({
    where: {
      OR: [
        {
          name: {
            contains: term,
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: term,
            mode: 'insensitive',
          },
        },
        {
          username: {
            contains: term,
            mode: 'insensitive',
          },
        },
      ],
    },
  });
}