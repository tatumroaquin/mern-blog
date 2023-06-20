import { useState } from 'react';

export const useLocalStorage = (keyName = '', defaultValue = '') => {
  const [data, setData] = useState(() => {
    const value = window.localStorage.getItem(keyName);

    if (!value) {
      window.localStorage.setItem(keyName, defaultValue);
      return defaultValue;
    }

    return value;
  });

  const setValue = (newValue: string) => {
    window.localStorage.setItem(keyName, newValue);
    setData(newValue);
  };

  return [data, setValue] as const;
};
