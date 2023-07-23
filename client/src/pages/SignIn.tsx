import { FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/UI/Button';
import { signInForm } from '../components/Form/SignInForm';
import { useForm } from '../hooks/useForm';
import { useAuth } from '../hooks/useAuth';
import { useHttp } from '../hooks/useHttp';

import styles from './SignIn.module.scss';
export const SignIn = () => {
  const { form, renderForm, isFormValid } = useForm(signInForm);
  const { sendRequest } = useHttp();
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const fromLocation = location?.state?.from?.pathname || '/';

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!isFormValid) return;

    try {
      const email = form.email.value;
      const password = form.password.value;

      const abortController = new AbortController();
      const authToken = await sendRequest({
        url: `${import.meta.env.VITE_SERVER_URL}/auth/signin`,
        abortController,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        withCredentials: true,
      });

      // const response = await axios.post(
      //   `${import.meta.env.VITE_SERVER_URL}/auth/signin`,
      //   JSON.stringify({ email, password }),
      //   {
      //     headers: { 'Content-Type': 'application/json' },
      //     withCredentials: true,
      //   }
      // );

      setAuth(authToken);
      navigate(fromLocation, { replace: true });
    } catch (e: any) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    localStorage.setItem('persist', String(persist));
  }, [persist]);

  return (
    <div className={styles['signin']}>
      <h1>Sign In</h1>
      <form className={styles['signin__form']} onSubmit={handleSubmit}>
        {renderForm()}
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
  );
};
