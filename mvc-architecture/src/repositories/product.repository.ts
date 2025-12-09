import type { Product } from "../models/product.model.js";
let products: Product[] = [];
let idCounter = 1;

export const productRepository = {
  findAll(): Product[] {
    return products;
  },

  findById(id: number): Product | undefined {
    return products.find((p) => p.id === id);
  },

  create(name: string, price: number): Product {
    const newProduct: Product = {
      id: idCounter++,
      name,
      price,
    };
    products.push(newProduct);
    return newProduct;
  },

  update(id: number, data: Partial<Product>): Product | undefined {
    const product = products.find((p) => p.id == id);
    if (!product) return undefined;
    if (data.name && typeof data.name === "string") product.name = data.name;
    if (data.price && typeof data.price === "number")
      product.price = data.price;
    return product;
  },

  delete(id: number): Product | undefined {
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return undefined;
    const deleted = products.splice(index, 1)[0];
    return deleted;
  },
};
