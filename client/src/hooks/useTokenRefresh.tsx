import { useHttp } from './useHttp';
import { useAuth } from './useAuth';

export const useTokenRefresh = () => {
  const { sendRequest } = useHttp();
  const { setAuth } = useAuth();

  const refresh = async () => {
    const abortController = new AbortController();
    const data = await sendRequest({
      url: `${import.meta.env.VITE_SERVER_URL}/token/refresh`,
      abortController,
      withCredentials: true,
    });

    if (data && Object.keys(data).includes('accessToken')) {
      setAuth(data);
    } else {
      setAuth({});
    }
    return data?.accessToken;
  };
  return refresh;
};
