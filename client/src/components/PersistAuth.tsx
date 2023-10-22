import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useTokenRefresh } from '@hooks/useTokenRefresh';
import { useAuth } from '@hooks/useAuth';
import { Spinner } from '@ui/Spinner';

export const PersistAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { auth, persist } = useAuth();
  const refresh = useTokenRefresh();

  useEffect(() => {
    let isMounted = true;
    const refreshToken = async () => {
      try {
        await refresh();
      } catch (e: unknown) {
        if (e instanceof Error) console.log(e.message);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    const hasAccessToken = Boolean(auth?.accessToken);

    if (!hasAccessToken && persist) {
      refreshToken();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && <Outlet />}
    </>
  );
};
