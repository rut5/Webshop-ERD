import express from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

app.use(express.json());



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});