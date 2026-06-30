'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api';

import css from '@/components/NotePreview/NotePreview.module.css';

export default function NotePreviewClient() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (isError || !note) {
    return <p>Something went wrong.</p>;
  }

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>

        <p className={css.tag}>
          {note.tag}
        </p>

        <p className={css.content}>
          {note.content}
        </p>

        <p className={css.date}>
          {new Date(
            note.createdAt
          ).toLocaleDateString()}
        </p>
      </div>
    </Modal>
  );
}