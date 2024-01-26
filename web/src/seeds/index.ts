import { PrismaClient } from "@prisma/client";
import { seedUsers } from "./users";
import { seedImages } from "./images";

const prisma = new PrismaClient();


const main = async () => {
  await seedUsers(prisma);
  await seedImages(prisma)

};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
