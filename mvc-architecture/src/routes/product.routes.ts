import { Router } from "express";
import { productController } from "../controllers/product.controller.js";

const router: Router = Router();

router.get("/", productController.getAll);
router.post("/", productController.create);
router.get("/:id", productController.getOne);
router.put("/:id", productController.update);
router.delete("/:id", productController.delete);

export default router;
