// import { PrismaClient } from "./generated/prisma/edge";
// import { withAccelerate } from "@prisma/extension-accelerate";

// const createPrisma = (accelerateUrl: string) => {
//   return new PrismaClient({
//     accelerateUrl
//   }).$extends(withAccelerate());
// };

// // 👇 THIS IS THE KEY PART
// let prisma: ReturnType<typeof createPrisma> | undefined;

// export const getPrisma = (accelerateUrl: string) => {
//   if (!prisma) {
//     prisma = createPrisma(accelerateUrl);
//   }
//   return prisma;
// };
