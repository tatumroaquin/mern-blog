import { FC, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { Button } from '../../components/UI/Button';
import { SearchInput } from '../../components/UI/SearchInput';
import styles from './SearchBar.module.scss';

interface SearchBar {
  onSubmit: (e: FormEvent) => Promise<any>;
}

export const SearchBar: FC<SearchBar> = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className={styles['searchbar']}>
      <SearchInput type='search' name='search' placeholder='Search Posts' />
      <Button className={styles['searchbar__button']}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>
    </form>
  );
};
