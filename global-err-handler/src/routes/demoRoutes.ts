import { Router } from "express";
import { demoController } from "../controllers/demoController";

const router = Router();

router.get("/hello", demoController.hello);
router.get("/app-error", demoController.causeAppError);
router.get("/crash", demoController.causeCrash);

export default router;
