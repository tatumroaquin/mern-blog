import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';
import { useTokenRefresh } from './useTokenRefresh';

interface SendRequest {
  url: string;
  abortController: AbortController;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTION';
  body?: string | null;
  headers?: {
    [header: string]: string;
  };
  withCredentials?: boolean;
}

export const useHttpPrivate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { auth } = useAuth();
  const refresh = useTokenRefresh();

  const sendRequest = useCallback(
    async ({
      url,
      abortController,
      method = 'GET',
      body = null,
      headers = {},
      withCredentials = true,
    }: SendRequest) => {
      try {
        setIsLoading(true);
        // request intercept check if authorization header is initialised
        if (!headers['authorization']) {
          headers['authorization'] = `Bearer ${auth?.accessToken}`;
        }

        const credentials = withCredentials ? 'include' : 'omit';

        const response = await fetch(url, {
          method,
          headers,
          body,
          signal: abortController.signal,
          credentials,
        });

        if (!response) return;

        let data = await response.json();

        // response intercept if unauthorised use token refresh and try again
        if (!response.ok && response.status === 401) {
          const newAccessToken = await refresh();
          headers['authorization'] = `Bearer ${newAccessToken}`;
          const newResponse = await fetch(url, {
            method,
            body,
            headers,
            signal: abortController.signal,
            credentials,
          });
          data = await newResponse.json();
        }

        if (data.error) setError(data.error);

        return data;
      } catch (e: unknown) {
        if (e instanceof Error) setError(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { isLoading, error, setError, sendRequest };
};
