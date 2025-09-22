import axios from "axios";
import { type Note } from "../types/note";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

type NoteHttpProps = {
  notes: Note[];
  totalPages: number;
};

axios.defaults.baseURL = "https://notehub-public.goit.study/api/";

const fetchNotes = async (
  page: number,
  search: string
): Promise<NoteHttpProps> => {
  const options = {
    params: { page, perPage: 12, search },
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${myKey}`,
    },
  };

  try {
    const response = await axios.get<NoteHttpProps>("notes", options);
    return response.data;
  } catch (error) {
    toast.error("Error fetching notes");
    throw error;
  }
};

export const createNote = async (noteData: {
  title: string;
  content: string;
  tag: string;
}): Promise<NoteHttpProps> => {
  try {
    const response = await axios.post<NoteHttpProps>("notes", noteData, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${myKey}`,
        "Content-Type": "application/json",
      },
    });
    toast.success("Note added successfully!");
    return response.data;
  } catch (error) {
    toast.error("Error fetching notes");
    throw error;
  }
};

export const deleteNote = async (id: string): Promise<void> => {
  try {
    await axios.delete(`/notes/${id}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${myKey}`,
      },
    });
    toast.success("Note deleted successfully!");
  } catch (error) {
    toast.error("Error deleting note");
    throw error;
  }
};

export const useFetchNotes = (currentPage: number, search: string) => {
  return useQuery({
    queryKey: ["notes", currentPage, search],
    queryFn: () => fetchNotes(currentPage, search),
    placeholderData: keepPreviousData,
  });
};
