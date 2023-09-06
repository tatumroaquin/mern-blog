import { FC, FormEvent, useEffect } from 'react';
import { useHttpPrivate } from '../hooks/useHttpPrivate';
import { useAuth } from '../hooks/useAuth';
import { jwtDecode } from '../utility/jwtDecode';

import { Spinner } from '../components/UI/Spinner';
import { Button } from '../components/UI/Button';
import styles from './ViewUser.module.scss';
import { useForm } from '../hooks/useForm';
import { accountForm } from '../components/Form/AccountForm';

export const ViewUser: FC = () => {
  const { isLoading, sendRequest } = useHttpPrivate();
  const { auth } = useAuth();

  useEffect(() => {
    const abortController = new AbortController();
    if (!auth?.accessToken) {
      console.log('User is not authenticated');
      return;
    }

    const user = jwtDecode(auth.accessToken);
    const { id } = user;
    console.log('AT Details', user);

    const fetchUser = async () => {
      const data = await sendRequest({
        url: `${import.meta.env.VITE_SERVER_URL}/user/${id}`,
        abortController,
      });
      accountForm.firstName.value = data.firstName;
      accountForm.lastName.value = data.firstName;
      accountForm.username.value = data.userName;
      accountForm.email.value = data.email;
      console.log(data);
    };
    fetchUser();
  }, [auth?.accessToken, sendRequest]);

  const { renderForm } = useForm(accountForm);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
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
            <Button className={styles['user-form__button']}>Update</Button>
          </form>
        )}
      </article>
    </>
  );
};
