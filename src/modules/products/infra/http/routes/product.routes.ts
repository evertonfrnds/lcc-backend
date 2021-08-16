import { Router } from "express";
import ProductController from "../controllers/ProductController";

const productRoutes = Router();
const productController = new ProductController();

productRoutes.get("/", async (req, res) => {
  const { statusCode, data } = await productController.index();

  res.status(statusCode).json(data);
});

productRoutes.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { statusCode, data } = await productController.show(id);

  res.status(statusCode).json(data);
});

productRoutes.post("/", async (req, res) => {
  const { name, description, value } = req.body;

  const { statusCode, data } = await productController.create({
    name,
    description,
    value,
  });

  res.status(statusCode).json(data);
});

productRoutes.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, value, is_active } = req.body;

  const { statusCode, data } = await productController.update({
    id,
    name,
    description,
    value,
    is_active,
  });

  res.status(statusCode).json(data);
});

productRoutes.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const { statusCode, data } = await productController.delete(id);

  res.status(statusCode).json(data);
});

export default productRoutes;
