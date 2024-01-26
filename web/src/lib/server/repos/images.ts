import { PUBLIC_INFINITE_SCROLL_PAGE_SIZE } from "$env/static/public";
import { idSchema, type IdType, type InfininteScrollType } from "$lib";
import { type Prisma, } from "@prisma/client";

import prisma from "../prisma";
import { error } from "@sveltejs/kit";

const imageFilters = (filters: InfininteScrollType) => {
  const { term } = filters;

  const AND: Prisma.Enumerable<Prisma.ImageWhereInput> = [];

  if (term) {
    AND.push({
      OR: [
        {
          title: {
            contains: term,
            mode: 'insensitive'
          }
        },
        {
          description: {
            contains: term,
            mode: 'insensitive'
          }
        }
      ]
    });
  }

  return AND;
};

export const findImagesInfinite = async (input: InfininteScrollType) => {
  const limit = input.limit ?? Number(PUBLIC_INFINITE_SCROLL_PAGE_SIZE);
  const { cursor, sort, order } = input;
  const AND = imageFilters(input);

  const items = await prisma.image.findMany({
    take: limit + 1,
    where: { AND: AND.length ? AND : undefined },
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: {
      [sort]: order
    },
    include: {
      user: true,
    }
  });

  let nextCursor: typeof cursor | undefined = undefined;

  if (items.length > limit) {
    const nextItem = items.pop();
    nextCursor = nextItem!.id;
  }

  return {
    items,
    nextCursor
  };
};

export const findImageById = async ({ id }: IdType) => {
  const image = await prisma.image.findFirst({
    where: {
      id,
    },
    include: {
      user: true,
    }
  });

  return image
};

export const deleteImageById = async (input: IdType) => {
  const result = idSchema.safeParse(input);

  if (!result.success) {
    throw error(400, {
      message: 'invalidInput'
    });
  }

  const { id } = input;

  const image = await prisma.image.findFirstOrThrow({
    where: {
      id
    }
  });


  if (!image) {
    throw error(404, 'Image does not exist');
  }

  return await prisma.image.delete({
    where: {
      id
    }
  });
};