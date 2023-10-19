import { FC, FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Spinner } from '@ui/Spinner';
import { Button } from '@ui/Button';
import { useHttpPrivate } from '@hooks/useHttpPrivate';
import { useForm } from '@hooks/useForm';
import { useAuth } from '@hooks/useAuth';
import { jwtDecode } from '@util/jwtDecode';
import { accountForm } from '@form/AccountForm';
import styles from './EditUser.module.scss';

import { ConfirmModal } from '@components/UI/ConfirmModal';
import { ErrorModal } from '@components/UI/ErrorModal';
import { AlertModal } from '@components/UI/AlertModal';

export const EditUser: FC = () => {
  const { isLoading, sendRequest, error, setError } = useHttpPrivate();
  const { auth } = useAuth();
  const { form, renderForm, isFormValid } = useForm(accountForm);
  const user = jwtDecode(auth?.accessToken || '');

  const [showConfirm, setShowConfirm] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    const abortController = new AbortController();
    const fetchUser = async () => {
      if (ignore) return;
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
    return () => {
      ignore = true;
    };
  }, [auth?.accessToken, user.id, sendRequest]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const target = e.target as HTMLFormElement;

    if (target.newPassword?.value !== target.confirmPassword?.value) {
      setError('New password and confirm password fields do not match');
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

  async function handleDeleteAccount() {
    const abortController = new AbortController();
    const userId = jwtDecode(auth?.accessToken ?? '').id;
    const response = await sendRequest({
      url: `${import.meta.env.VITE_SERVER_URL}/user/delete/${userId}`,
      method: 'DELETE',
      abortController,
    });
    console.log('EDIT', response);
    if (response?.success) navigate('/auth/logout');
  }

  function handleConfirmCancel() {
    setShowConfirm(false);
  }

  function onDelete() {
    setShowConfirm(true);
  }

  return (
    <>
      <ErrorModal
        show={!!error}
        header='Error has occurred'
        error={error}
        onCancel={() => setError('')}
      />
      <AlertModal
        show={!!alertMessage}
        header='Alert'
        message={alertMessage}
        onCancel={() => setAlertMessage('')}
      />
      <ConfirmModal
        show={showConfirm}
        header='Confirm account deletion'
        message='This is a destructive action, once you delete your account, it can never be restored. Are you sure you want to continue?'
        onConfirm={handleDeleteAccount}
        onCancel={handleConfirmCancel}
      />
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
              Save Details
            </Button>
            <Button
              type='button'
              className={styles['user-form__button']}
              disabled={!isFormValid()}
              onClick={onDelete}
            >
              Delete Account
            </Button>
          </form>
        )}
      </article>
    </>
  );
};
