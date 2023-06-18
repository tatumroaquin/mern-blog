import { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/UI/Button';
import { signInForm } from '../components/Form/SignInForm';
import { useForm } from '../hooks/useForm';
import styles from './SignIn.module.scss';

export const SignIn = () => {
  const { renderForm, isFormValid } = useForm(signInForm);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(isFormValid);
  }
  return (
    <div className={styles['signin']}>
      <h1>Sign In</h1>
      <form className={styles['signin__form']} onSubmit={handleSubmit}>
        {renderForm()}
        <Button className={styles['signin__button']}>Sign In</Button>
        <Link className={styles['signup__link']} to='/auth/signup'>
          Create an Account
        </Link>
      </form>
    </div>
  );
};
