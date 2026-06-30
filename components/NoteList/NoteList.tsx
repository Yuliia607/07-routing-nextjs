'use client';

import css from './NoteList.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import Link from 'next/link';
import type { Note } from '@/types/note';

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: deleteNote,

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['notes'],
    });
  },
});
  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li key={id} className={css.listItem}>
          <h2 className={css.title}>{title}</h2>

          <p className={css.content}>{content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <Link href={`/notes/${id}`}>
            View details
            </Link>
            <button
  className={css.button}
  onClick={() => mutation.mutate(id)}
>
  Delete
</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;