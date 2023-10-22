import { FormEvent, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import styles from './SignIn.module.scss';

import { Button } from '@ui/Button';
import { Spinner } from '@ui/Spinner';
import { ErrorModal } from '@ui/ErrorModal';
import { signInForm } from '@form/SignInForm';

import { useForm } from '@hooks/useForm';
import { useAuth } from '@hooks/useAuth';
import { useHttp } from '@hooks/useHttp';

export const SignIn = () => {
  const { form, renderForm, isFormValid } = useForm(signInForm);
  const { isLoading, sendRequest, error, setError } = useHttp();
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const fromLocation = location?.state?.from?.pathname || '/';

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptcha, setRecaptcha] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    recaptchaRef.current?.reset();

    if (!isFormValid) return;

    const email = form.email.value;
    const password = form.password.value;

    const abortController = new AbortController();
    const authToken = await sendRequest({
      url: `${import.meta.env.VITE_SERVER_URL}/auth/signin`,
      abortController,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, recaptcha }),
      withCredentials: true
    });

    if (!authToken.error) {
      setAuth(authToken);
      navigate(fromLocation, { replace: true });
    }
  }

  const onRecaptchaChange = (token: string | null) => {
    setRecaptcha(token ?? '');
  };

  useEffect(() => {
    localStorage.setItem('persist', String(persist));
  }, [persist]);

  return (
    <>
      <ErrorModal
        show={!!error}
        header='Error has occurred!'
        error={error}
        onCancel={() => setError('')}
      />
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className={styles['signin']}>
          <h1>Sign In</h1>
          <form className={styles['signin__form']} onSubmit={handleSubmit}>
            {renderForm()}
            <ReCAPTCHA
              className={styles['signin__recaptcha']}
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={onRecaptchaChange}
            />
            <Button className={styles['signin__button']}>Sign In</Button>
            <div className={styles['signin__persist']}>
              <input
                type='checkbox'
                name='persist'
                checked={persist}
                onChange={() => setPersist((prevState) => !prevState)}
              />
              <label htmlFor='persist'>Remember this device?</label>
            </div>
            <Link className={styles['signup__link']} to='/auth/signup'>
              Create an Account
            </Link>
          </form>
        </div>
      )}
    </>
  );
};
