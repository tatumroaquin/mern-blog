import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Spinner } from '@ui/Spinner';
import { AlertModal } from '@ui/AlertModal';
import { ErrorModal } from '@ui/ErrorModal';

import { useAuth } from '@hooks/useAuth';
import { useHttpPrivate } from '@hooks/useHttpPrivate';
import { useLocalStorage } from '@hooks/useLocalStorage';

export const SignOut: FC = () => {
  const { setAuth } = useAuth();
  const [_, setMarkdown] = useLocalStorage('markdown');
  const { isLoading, sendRequest, error, setError } = useHttpPrivate();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    const abortController = new AbortController();
    const logout = async () => {
      if (ignore) return;
      const response = await sendRequest({
        url: `${import.meta.env.VITE_SERVER_URL}/auth/logout`,
        abortController,
      });
      if (response?.success) {
        setAlertMessage(response.success);
        setShowAlert(true);
      }
    };
    logout();
    setAuth({});
    setMarkdown('');
    return () => {
      ignore = true;
      abortController.abort();
    };
  }, [sendRequest]);

  function handleOk() {
    setShowAlert(false);
    navigate('/', { replace: true });
  }

  return (
    <>
      <ErrorModal
        show={!!error}
        header='Error has occurred!'
        error={error}
        onCancel={() => setError('')}
      />
      <AlertModal
        show={showAlert}
        header='Alert'
        message={alertMessage}
        onCancel={handleOk}
      />
      {isLoading && <Spinner />}
    </>
  );
};
