'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import type { NoteTag } from '@/types/note';
import css from './NoteForm.module.css';
interface NoteFormProps {
  onClose: () => void;
}
const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Minimum 3 characters')
    .max(50, 'Maximum 50 characters')
    .required('Title is required'),

  content: Yup.string()
    .max(500, 'Maximum 500 characters'),

  tag: Yup.string()
    .oneOf([
      'Todo',
      'Work',
      'Personal',
      'Meeting',
      'Shopping',
    ])
    .required('Tag is required'),
});

const initialValues: FormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};
interface FormValues {
  title: string;
  content: string;
  tag: NoteTag;
}
const NoteForm = ({ onClose }: NoteFormProps) => {const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: createNote,

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['notes'],
    });

    onClose();
  },
});
  return (
    <Formik
  initialValues={initialValues}
  validationSchema={validationSchema}
  onSubmit={(values) => {
    mutation.mutate(values);
  }}
>
  <Form className={css.form}>
    <div className={css.formGroup}>
      <label htmlFor="title">Title</label>

      <Field
        id="title"
        name="title"
        type="text"
        className={css.input}
      />

      <ErrorMessage
        name="title"
        component="span"
        className={css.error}
      />
    </div>

    <div className={css.formGroup}>
      <label htmlFor="content">Content</label>

      <Field
        as="textarea"
        id="content"
        name="content"
        rows={8}
        className={css.textarea}
      />

      <ErrorMessage
        name="content"
        component="span"
        className={css.error}
      />
    </div>

    <div className={css.formGroup}>
      <label htmlFor="tag">Tag</label>

      <Field
        as="select"
        id="tag"
        name="tag"
        className={css.select}
      >
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </Field>

      <ErrorMessage
        name="tag"
        component="span"
        className={css.error}
      />
    </div>

    <div className={css.actions}>
      <button
        type="button"
        className={css.cancelButton}
        onClick={onClose}
      >
        Cancel
      </button>

      <button
        type="submit"
        className={css.submitButton}
        disabled={mutation.isPending}
      >
        Create note
      </button>
    </div>
  </Form>
</Formik>
  );
};

export default NoteForm;