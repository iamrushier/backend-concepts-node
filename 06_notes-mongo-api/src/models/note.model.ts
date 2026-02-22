// notes-mongo-api/src/models/note.model.ts
import mongoose from "mongoose";
import type { Note } from "../types/note.js";

const NoteSchema = new mongoose.Schema<Note>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const NoteModel = mongoose.model("Note", NoteSchema);
