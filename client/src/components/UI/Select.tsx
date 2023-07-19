import { FC } from 'react';
import CreatableSelect from 'react-select/creatable';
import { ISelect } from '../../types';
import styles from './Select.module.scss';

export const Select: FC<ISelect> = ({
  name,
  label,
  placeholder,
  errorMessage,
  isValid,
  onChange,
}) => {
  return (
    <div className={styles['select__container']}>
      <label className={styles['select__label']} htmlFor={name}>
        {label}
      </label>
      <CreatableSelect
        isMulti={true}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        classNames={{ control: () => styles['select__field'] }}
      />
      {errorMessage && !isValid && (
        <span className={styles['select__error']}>{errorMessage}</span>
      )}
    </div>
  );
};
