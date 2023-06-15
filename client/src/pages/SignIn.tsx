import { FormEvent } from 'react';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { Link } from 'react-router-dom';
import styles from './SignIn.module.scss';

export const SignIn = () => {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console;
  }
  return (
    <div className={styles['signin']}>
      <h1>Sign In</h1>
      <form className={styles['signin__form']} onSubmit={handleSubmit}>
        <Input
          id='username'
          label='Username'
          name='username'
          placeholder='Enter Username'
          type='text'
        />
        <Input
          id='password'
          label='Password'
          name='password'
          placeholder='Enter Password'
          type='password'
        />
        <Button className={styles['signin__button']}>Sign In</Button>
        <Link className={styles['signup__link']} to='/auth/signup'>
          Create an Account
        </Link>
      </form>
    </div>
  );
};
