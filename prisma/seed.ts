import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {

  // Creates categories (computers and tablets)
  const computers = await prisma.category.create({ data: { name: "Computers" } });
  const tablets = await prisma.category.create({ data: { name: "Tablets" } });

  // Creates products (headphones and novel) 
  const productA = await prisma.product.create({ 
    data: { name: "Lenovo ThinkPad", price: 1399.0, stock: 25, category_id: computers.id } 
  });
  const productB = await prisma.product.create({ 
    data: { name: "SAMSUNG GALAXY TAB S6", price: 249.0, stock: 100, category_id: tablets.id } 
  });
  const productC = await prisma.product.create({ 
    data: { name: "Apple iPad Pro", price: 799.0, stock: 50, category_id: tablets.id } 
  });
  const productD = await prisma.product.create({ 
    data: { name: "ASUS ROG Strix G15", price: 1499.0, stock: 10, category_id: computers.id } 
  });

  // Creates customers
  const rut = await prisma.customer.create({ data: { name: "Rut", email: "rut@outlook.com" } });
  const steve = await prisma.customer.create({ data: { name: "Steve", email: "steve@gmail.com" } });

  // Creates orders
  const order1 = await prisma.order.create({ data: { customer_id: rut.id } });
  const order2 = await prisma.order.create({ data: { customer_id: steve.id } });
  
  // Creates order items

  // 1
  await prisma.orderItem.create({ 
    data: { order_id: order1.id, product_id: productA.id, quantity: 1 } 
  });
  await prisma.orderItem.create({ 
    data: { order_id: order1.id, product_id: productB.id, quantity: 5 } 
  });
  // 2
  await prisma.orderItem.create({ 
    data: { order_id: order2.id, product_id: productC.id, quantity: 1 } 
  });
  await prisma.orderItem.create({ 
    data: { order_id: order2.id, product_id: productD.id, quantity: 1 } 
  });

}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });