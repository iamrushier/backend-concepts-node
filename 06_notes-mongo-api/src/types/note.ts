// notes-mongo-api/src/types/note.ts
export interface Note {
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}
