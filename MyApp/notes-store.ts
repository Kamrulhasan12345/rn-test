import { storage } from "./storage";

export type Note = {
  id: number;
  title: string;
  description: string;
  tag: string[]
}

const INDEX_KEY = "notes:index";

// Save a single note
export function saveNote(note: Note) {
  storage.set(`note:${note.id}`, JSON.stringify(note));
}

// Get a single note
export function getNote(id: number): Note | null {
  const json = storage.getString(`note:${id}`);
  return json ? JSON.parse(json) : null;
}

// Delete a note
export function deleteNote(id: number) {
  storage.remove(`note:${id}`);
}

function getIndex(): number[] {
  const json = storage.getString(INDEX_KEY);
  return json ? JSON.parse(json) : [];
}

function saveIndex(ids: number[]) {
  storage.set(INDEX_KEY, JSON.stringify(ids));
}

// Add a note and update index
export function addNote(note: Note) {
  saveNote(note);
  const ids = getIndex();
  saveIndex([...ids, note.id]);
}

// Get all notes
export function getAllNotes(): Note[] {
  return getIndex().map((id) => getNote(id)!).filter(Boolean);
}
