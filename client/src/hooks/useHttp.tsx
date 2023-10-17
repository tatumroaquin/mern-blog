import { useState, useEffect, useCallback, useRef } from 'react';

interface SendRequest {
  url: string;
  abortController: AbortController;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTION';
  body?: string | null;
  headers?: HeadersInit;
  withCredentials?: boolean;
}

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const activeRequests = useRef<AbortController[]>([]);

  const sendRequest = useCallback(
    async ({
      url,
      abortController,
      method = 'GET',
      body = null,
      headers = {},
      withCredentials = false,
    }: SendRequest) => {
      activeRequests.current.push(abortController);

      try {
        setIsLoading(true);

        const response = await fetch(url, {
          method,
          headers,
          body,
          signal: abortController.signal,
          credentials: withCredentials ? 'include' : 'omit',
        });

        if (!response) return;

        const data: any = await response.json();

        activeRequests.current = activeRequests.current.filter(
          (request) => request !== abortController
        );

        if (!response.ok || response.type === 'error') {
          throw new Error(
            data.error || 'Request failed, something went wrong!'
          );
        }

        if (data.error) setError(data.error);

        return data;
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    activeRequests.current.forEach((request) => request.abort());
  }, []);

  return { isLoading, error, setError, sendRequest };
};
