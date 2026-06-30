import LayoutNotes from '@/components/LayoutNotes/LayoutNotes';

interface FilterLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function FilterLayout({
  children,
  sidebar,
}: FilterLayoutProps) {
  return (
    <LayoutNotes
      sidebar={sidebar}
    >
      {children}
    </LayoutNotes>
  );
}