// notes-mongo-api/src/controllers/note.controller.ts
import type { Request, Response } from "express";
import { NoteModel } from "../models/note.model.js";

export class NoteController {
  static async getAll(req: Request, res: Response) {
    const notes = await NoteModel.find();
    res.json(notes);
  }

  static async getOne(req: Request, res: Response) {
    const id = req.params.id;
    const note = await NoteModel.findById(id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  }

  static async create(req: Request, res: Response) {
    const { title, content } = req.body;
    if (!title || !content)
      return res.status(400).json({ error: "Title and content required" });
    const created = await NoteModel.create({ title, content });
    res.json(created);
  }

  static async update(req: Request, res: Response) {
    const { title, content } = req.body;
    const updated = await NoteModel.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Note not found" });
    return res.json(updated);
  }

  static async delete(req: Request, res: Response) {
    const deleted = await NoteModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Note not found" });
    res.json(deleted);
  }
}
