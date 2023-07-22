import { FC, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useHttpPrivate } from '../hooks/useHttpPrivate';
import { Spinner } from '../components/UI/Spinner';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const SignOut: FC = () => {
  const { auth, setAuth } = useAuth();
  const [_, setMarkdown] = useLocalStorage('markdown');
  const { isLoading, sendRequest } = useHttpPrivate();
  const [username] = useState(auth?.username);

  useEffect(() => {
    const logout = async () => {
      const abortController = new AbortController();
      await sendRequest({
        url: `${import.meta.env.VITE_SERVER_URL}/auth/logout`,
        abortController,
      });
    };
    logout();
    setAuth({});
    setMarkdown('');
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && username && <h1>{username} has been logged out.</h1>}
      {!isLoading && !username && <h1>No authenticated accounts found.</h1>}
    </>
  );
};
