import axios from "axios";
import type { NoteTag, Note} from "../types/note"

const baseUrl = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${
  process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
}`;

interface FetchNotesParams {
    page?: number;
    search?: string;
}

interface FetchNotesResponse {
    notes: Note[],
    totalPages: number,
}

interface createNoteProps {
    title: string,
    content: string,
    tag: NoteTag,
}

export async function fetchNotes({ page = 1, search = "",}: FetchNotesParams): Promise<FetchNotesResponse> {
    const getNotes = await axios.get<FetchNotesResponse>(`${baseUrl}/notes`, {
        params: { page, search, perPage: 12, ...(search ? { search, } : {}) },
    })
    return getNotes.data
} 

export async function createNote(newNote: createNoteProps): Promise<Note> {
    const createNote = await axios.post<Note>(`${baseUrl}/notes`, newNote);
    return createNote.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
    const deletedNote = await axios.delete<Note>(`${baseUrl}/notes/${noteId}`);
    return deletedNote.data
}

export async function fetchNoteById(noteId: string) {
    const noteById = await axios.get(`${baseUrl}/notes/${noteId}`);
    return noteById.data;
}