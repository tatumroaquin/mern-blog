import { useState, useEffect, useCallback, useRef } from 'react';

interface SendRequest {
  url: string;
  abortController: AbortController;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTION';
  body?: string | null;
  headers?: HeadersInit;
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
    }: SendRequest) => {
      activeRequests.current.push(abortController);

      try {
        setIsLoading(true);
        const response = await fetch(url, {
          method,
          headers,
          body,
          signal: abortController.signal,
        });

        const data: any = await response.json();

        activeRequests.current = activeRequests.current.filter(
          (request) => request !== abortController
        );

        if (!response.ok || response.type === 'error') {
          throw new Error(
            data.error || 'Request failed, something went wrong!'
          );
        }
        setIsLoading(false);
        return data;
      } catch (e: any) {
        setError(e.message);
        setIsLoading(false);
        console.log(e.message);
      }
    },
    []
  );

  useEffect(() => {
    activeRequests.current.forEach((request) => request.abort());
  }, []);
  return { isLoading, error, setError, sendRequest };
};
