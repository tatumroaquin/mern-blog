import { FormEvent } from 'react';
import { Button } from '../components/UI/Button';
import { Link } from 'react-router-dom';

import { signUpForm } from '../components/Form/SignUpForm';
import { useForm } from '../hooks/useForm';

import styles from './SignUp.module.scss';

export const SignUp = () => {
  const { renderForm, isFormValid } = useForm(signUpForm);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(isFormValid());
  }

  return (
    <div className={styles['signup']}>
      <h1>Sign Up</h1>
      <form className={styles['signup__form']} onSubmit={handleSubmit}>
        {renderForm()}
        <Button className={styles['signup__button']}>Sign Up</Button>
        <p className={styles['signin__link']}>
          Already have an account? <Link to='/auth/signin'>Sign In</Link>
        </p>
      </form>
    </div>
  );
};
