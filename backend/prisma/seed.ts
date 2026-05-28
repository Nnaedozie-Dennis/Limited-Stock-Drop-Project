import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create a product with limited stock
  await prisma.product.upsert({
    where: { id: "prod_001" },
    update: {},
    create: {
      id: "prod_001",
      name: "Limited Edition Sneakers",
      description: "Hype drop - only 50 available",
      price: 299.99,
      stock: 50,
      imageUrl: "https://example.com/sneakers.jpg",
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
