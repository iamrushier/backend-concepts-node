import { productRepository } from "../repositories/product.repository.js";
export const productService = {
  getAllProducts() {
    return productRepository.findAll();
  },
  getProductById(id: number) {
    const product = productRepository.findById(id);
    if (!product) throw new Error("Product not found");
    return product;
  },
  createProduct(name: string, price: number) {
    if (!name || typeof price !== "number")
      throw new Error("Invalid product data");
    return productRepository.create(name, price);
  },

  updateProduct(id: number, data: { name?: string; price?: number }) {
    const updated = productRepository.update(id, data);
    if (!updated) throw new Error("Product not found");
    return updated;
  },

  deleteProduct(id: number) {
    const deleted = productRepository.delete(id);
    if (!deleted) throw new Error("Product not found");
    return deleted;
  },
};
