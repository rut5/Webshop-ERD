import express from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

app.use(express.json());

// -- CODE FROM ASSIGNMENT -- //

// 1. Create a product (POST /products) - Uses req.body
app.post("/products", async (req, res) => {
  try {
    const newProduct = await prisma.product.create({ data: req.body });
    res.json(newProduct);
  } catch (error) {
    res.status(500).send(error instanceof Error ? error.message : "Unknown error");
  }
});

// 2. Filter products (GET /products) - Uses req.query
app.get("/products", async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;
    const products = await prisma.product.findMany({
      where: {
        price: {
          gte: minPrice ? Number(minPrice) : undefined,
          lte: maxPrice ? Number(maxPrice) : undefined
        },
        category: category ? { name: { equals: String(category) } } : undefined
      },
      include: { category: true }
    });
    res.json(products);
  } catch (error) {
    res.status(500).send(error instanceof Error ? error.message : "Unknown error");
  }
});

// 3. Update a product (PATCH /products/:productId) - Uses req.params
app.patch("/products/:productId", async (req, res) => {
  try {
    const updated = await prisma.product.update({
      where: { id: Number(req.params.productId) },
      data: req.body
    });
    res.json(updated);
  } catch (error) {
    res.status(500).send(error instanceof Error ? error.message : "Unknown error");
  }
});

// -- END OF CODE FROM ASSIGNMENT -- //

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});