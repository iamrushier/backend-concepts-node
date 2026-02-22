// notes-mongo-api/src/routes/note.route.ts
import { Router } from "express";
import { NoteController } from "../controllers/note.controller.js";

const router: Router = Router();

router.get("/", NoteController.getAll);
router.post("/", NoteController.create);
router.get("/:id", NoteController.getOne);
router.put("/:id", NoteController.update);
router.delete("/:id", NoteController.delete);

export default router;
