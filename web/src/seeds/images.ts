import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';
import { createId } from "@paralleldrive/cuid2";

export const seedImages = async (prisma: PrismaClient) => {
  await prisma.image.deleteMany({})
  const users = await prisma.user.findMany({ select: { id: true } })
  const userIds = users.map(({ id }) => id)

  for (let i = 0; i < 500; i++) {
    const randomNumber = faker.number.int({
      min: 0,
      max: userIds.length - 1,
    });
    const url = faker.image.url({
      height: 480,
      width: 640
    })
    await prisma.image.create({
      data: {
        title: faker.word.words(2),
        description: faker.lorem.paragraph(10),
        url,
        likes: faker.number.int({
          min: 0,
          max: 100
        }),
        views: faker.number.int({
          min: 0,
          max: 500
        }),
        userId: userIds[randomNumber],
        fileName: url,
        folder: '',
        uniqueId: createId()
      }
    })
  }
}