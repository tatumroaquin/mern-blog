import { FormEvent, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import styles from './SignUp.module.scss';

import { Button } from '@ui/Button';
import { ErrorModal } from '@ui/ErrorModal';

import { useForm } from '@hooks/useForm';
import { useHttp } from '@hooks/useHttp';

import { signUpForm } from '@form/SignUpForm';

export const SignUp = () => {
  const navigate = useNavigate();
  const { renderForm } = useForm(signUpForm);
  const { sendRequest, error, setError } = useHttp();

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptcha, setRecaptcha] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    recaptchaRef.current?.reset();

    const { firstName, lastName, userName, email, password, confirmPassword } =
      e.target as HTMLFormElement;

    const body = {
      firstName: firstName.value,
      lastName: lastName.value,
      userName: userName.value,
      email: email.value,
      recaptcha: recaptcha,
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
  }

  function onRecaptchaChange(token: string | null) {
    setRecaptcha(token ?? '');
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
          <ReCAPTCHA
            className={styles['signup__recaptcha']}
            ref={recaptchaRef}
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            onChange={onRecaptchaChange}
          />
          <Button className={styles['signup__button']}>Sign Up</Button>
          <p className={styles['signin__link']}>
            Already have an account? <Link to='/auth/signin'>Sign In</Link>
          </p>
        </form>
      </div>
    </>
  );
};
