'use client';

import css from './SearchBox.module.css';

interface SearchBoxProps {
  onSearch: (value: string) => void;
}

const SearchBox = ({
  onSearch,
}: SearchBoxProps) => {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={(event) =>
        onSearch(event.target.value)
      }
    />
  );
};

export default SearchBox;