import { FC, FormEvent, useEffect } from 'react';
import { Spinner } from '../components/UI/Spinner';
import { Button } from '../components/UI/Button';
import { useHttpPrivate } from '../hooks/useHttpPrivate';
import { useForm } from '../hooks/useForm';
import { useAuth } from '../hooks/useAuth';
import { jwtDecode } from '../utility/jwtDecode';
import { accountForm } from '../components/Form/AccountForm';
import styles from './ViewUser.module.scss';

export const ViewUser: FC = () => {
  const { isLoading, sendRequest } = useHttpPrivate();
  const { auth } = useAuth();
  const { form, renderForm, isFormValid } = useForm(accountForm);
  const user = jwtDecode(auth?.accessToken || '');

  useEffect(() => {
    const abortController = new AbortController();
    const fetchUser = async () => {
      const data = await sendRequest({
        url: `${import.meta.env.VITE_SERVER_URL}/user/view/${user.id}`,
        abortController,
      });

      const fields = ['firstName', 'lastName', 'userName', 'email'];
      for (const key of Object.keys(form)) {
        if (fields.includes(key)) {
          form[key].value = data[key];
        }
        form[key].valid = true;
      }
      form.oldPassword.valid = false;
    };
    fetchUser();
  }, [auth?.accessToken, user.id, sendRequest]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const target = e.target as HTMLFormElement;

    if (target.newPassword?.value !== target.confirmPassword?.value) {
      console.log('new and confirm passwords do not match');
      return;
    }

    const abortController = new AbortController();
    const body: { [x: string]: string } = {};
    const keys: string[] = [
      'firstName',
      'lastName',
      'userName',
      'email',
      'oldPassword',
      'newPassword',
    ];

    for (const key of keys) {
      body[key] = target[key].value;
    }
    body.userId = user.id;

    const response = await sendRequest({
      url: `${import.meta.env.VITE_SERVER_URL}/user/edit/${user.id}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      abortController,
    });

    console.log(response);
  }

  return (
    <>
      <article className={styles['user-form']}>
        <h1 className={styles['user-form__title']}>Account Details</h1>
        <br />
        {isLoading && <Spinner />}
        {!isLoading && (
          <form className={styles['user-form__form']} onSubmit={handleSubmit}>
            {renderForm()}
            <Button
              type='submit'
              className={styles['user-form__button']}
              disabled={!isFormValid()}
            >
              Update
            </Button>
          </form>
        )}
      </article>
    </>
  );
};
