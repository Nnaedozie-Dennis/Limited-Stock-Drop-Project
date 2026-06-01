import prisma from "./src/lib/prisma";

async function checkData() {
  try {
    console.log("=== Checking Reservations ===");
    const reservations = await prisma.reservation.findMany({
      include: { product: true },
    });
    console.log(reservations);

    console.log("\n=== Checking Products ===");
    const products = await prisma.product.findMany();
    console.log(products);

    console.log("\n=== Checking Orders ===");
    const orders = await prisma.order.findMany();
    console.log(orders);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkData();
