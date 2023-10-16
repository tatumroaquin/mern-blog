import { IInput } from '@types';
import styles from '@ui/Input.module.scss';

export const Input = ({
  label,
  name,
  placeholder,
  type,
  value,
  onChange,
  errorMessage,
  isValid,
}: IInput) => {
  return (
    <div className={styles['input__container']}>
      <label className={styles['input__label']} htmlFor={`${name}`}>
        {label}
      </label>
      <input
        className={styles['input__field']}
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
      {errorMessage && !isValid && (
        <span className={styles['input__error']}>{errorMessage}</span>
      )}
    </div>
  );
};
