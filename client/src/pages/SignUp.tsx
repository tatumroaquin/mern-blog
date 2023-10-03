import { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SignUp.module.scss';

import { Button } from '../components/UI/Button';
import { ErrorModal } from '../components/UI/ErrorModal';

import { useForm } from '../hooks/useForm';
import { useHttp } from '../hooks/useHttp';

import { signUpForm } from '../components/Form/SignUpForm';

export const SignUp = () => {
  const navigate = useNavigate();
  const { renderForm } = useForm(signUpForm);
  const { sendRequest, error, setError } = useHttp();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const { firstName, lastName, userName, email, password, confirmPassword } =
      e.target as HTMLFormElement;

    const body = {
      firstName: firstName.value,
      lastName: lastName.value,
      userName: userName.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    };
    const abortController = new AbortController();
    const response = await sendRequest({
      url: `${import.meta.env.VITE_SERVER_URL}/auth/signup`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      abortController,
      withCredentials: true,
    });
    if (!response.error) navigate('/auth/signin');
    console.log('RES', response);
  }

  return (
    <>
      <ErrorModal
        show={!!error}
        header='Error has occurred!'
        error={error}
        onCancel={() => setError('')}
      />
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
    </>
  );
};
