import { FormEvent } from 'react';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { Link } from 'react-router-dom';
import styles from './SignUp.module.scss';

export const SignUp = () => {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }
  return (
    <div className={styles['signup']}>
      <h1>Sign Up</h1>
      <form className={styles['signup__form']} onSubmit={handleSubmit}>
        <Input
          id='firstName'
          label='First Name'
          name='firstName'
          placeholder='Enter First Name'
          type='text'
          required
        />
        <Input
          id='lastName'
          label='Last Name'
          name='lastName'
          placeholder='Enter last Name'
          type='text'
          required
        />
        <Input
          id='email'
          label='Email'
          name='email'
          placeholder='Enter Email'
          type='email'
          required
        />
        <Input
          id='username'
          label='Username'
          name='username'
          placeholder='Enter Username'
          type='text'
          required
        />
        <Input
          id='password'
          label='Password'
          name='password'
          placeholder='Enter Password'
          type='password'
          required
        />
        <Input
          id='confirm'
          label='Confirm Password'
          name='confirm'
          placeholder='Retype Password'
          type='password'
          required
        />
        <Button className={styles['signup__button']}>Sign Up</Button>
        <p className={styles['signin__link']}>
          Already have an account? <Link to='/auth/signin'>Sign In</Link>
        </p>
      </form>
    </div>
  );
};
