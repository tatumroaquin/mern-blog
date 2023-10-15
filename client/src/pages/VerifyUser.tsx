import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useHttp } from '../hooks/useHttp';

import { Spinner } from '../components/UI/Spinner';
import { AlertModal } from '../components/UI/AlertModal';
import { ErrorModal } from '../components/UI/ErrorModal';

export const VerifyUser: FC = () => {
  const { isLoading, sendRequest, error, setError } = useHttp();

  const { userId, verifyToken } = useParams();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  // https://react.dev/reference/react/useEffect#fetching-data-with-effects
  useEffect(() => {
    let ignore = false;
    const verifyUser = async () => {
      if (ignore) return;
      const abortController = new AbortController();
      const response = await sendRequest({
        url: `${
          import.meta.env.VITE_SERVER_URL
        }/auth/verify/${userId}/${verifyToken}`,
        abortController,
      });
      if (response.success) {
        setAlertMessage(response.success);
        setShowAlert(true);
      }
    };
    verifyUser();
    return () => { ignore = true; };
  }, []);

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
