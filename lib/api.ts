import axios from 'axios';
import type { Note, NoteTag } from '@/types/note';

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

interface FetchNotesParams {
  page: number;
  search?: string;
  tag?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async ({
  page,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage: 12,
      search,
      ...(tag ? { tag } : {}),
    },
  });

  return response.data;
};

export const createNote = async (
  noteData: CreateNoteData
): Promise<Note> => {
  const response = await api.post<Note>(
    '/notes',
    noteData
  );

  return response.data;
};

export const deleteNote = async (
  id: string
): Promise<Note> => {
  const response = await api.delete<Note>(
    `/notes/${id}`
  );

  return response.data;
};
export const fetchNoteById = async (
  id: string
): Promise<Note> => {
  const response = await api.get<Note>(
    `/notes/${id}`
  );

  return response.data;
};