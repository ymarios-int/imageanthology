import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';

export const seedUsers = async (prisma: PrismaClient) => {
  await prisma.user.deleteMany({})
  await prisma.user.createMany({
    data: [{
      name: faker.person.fullName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatarGitHub(),
    }, {
      name: faker.person.fullName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatarGitHub(),
    }, {
      name: faker.person.fullName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatarGitHub(),
    }, {
      name: faker.person.fullName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatarGitHub(),
    }, {
      name: faker.person.fullName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatarGitHub(),
    },]
  })
}