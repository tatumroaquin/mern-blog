import clsx from 'clsx';
import { ITextArea } from '../../types';
import styles from './TextArea.module.scss';

export const TextArea = ({
  name,
  placeholder,
  value,
  onChange,
  errorMessage,
  isValid,
  className,
}: ITextArea) => {
  return (
    <div
      className={clsx(styles['ta'], {
        [`${className}`]: !!className,
      })}
    >
      <textarea
        className={styles['ta__field']}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {errorMessage && !isValid && (
        <span className={styles['ta__error']}>{errorMessage}</span>
      )}
    </div>
  );
};
