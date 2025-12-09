import type { Request, Response } from "express";
import { productService } from "../services/product.service.ts";

export const productController = {
  getAll(req: Request, res: Response) {
    const products = productService.getAllProducts();
    return res.json(products);
  },

  getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const product = productService.getProductById(id);
      res.json(product);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  },
  create(req: Request, res: Response) {
    try {
      const { name, price } = req.body;
      const newProduct = productService.createProduct(name, price);
      res.status(201).json(newProduct);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const updated = productService.updateProduct(id, req.body);
      res.json(updated);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  },

  delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const deleted = productService.deleteProduct(id);
      res.json(deleted);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  },
};
