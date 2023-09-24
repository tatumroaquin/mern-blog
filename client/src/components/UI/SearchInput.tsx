import { FC } from 'react';
import styles from './SearchInput.module.scss';

interface SearchInput {
  name: string;
  placeholder: string;
  type: string;
  value?: string;
}

export const SearchInput: FC<SearchInput> = ({
  name,
  placeholder,
  type,
  value,
}) => {
  return (
    <input
      className={styles['searchinput']}
      id={name}
      name={name}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );
};
