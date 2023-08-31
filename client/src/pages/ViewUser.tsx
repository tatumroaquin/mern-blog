import { FC, useState, useEffect } from 'react';
import { useHttpPrivate } from '../hooks/useHttpPrivate';
import { useAuth } from '../hooks/useAuth';
import { jwtDecode } from '../utility/jwtDecode';

export const ViewUser: FC = () => {
  const { sendRequest } = useHttpPrivate();
  const { auth } = useAuth();
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    const abortController = new AbortController();
    if (!auth?.accessToken) {
      console.log('User is not authenticated');
      return;
    }

    const accessTokenDetails = jwtDecode(auth.accessToken);
    const { id } = accessTokenDetails;
    console.log('AT Details', accessTokenDetails);

    const fetchUser = async () => {
      const data = await sendRequest({
        url: `${import.meta.env.VITE_SERVER_URL}/user/${id}`,
        abortController,
      });
      setUserData(data);
    };
    fetchUser();
  }, [sendRequest]);

  return (
    <>
      <code>{JSON.stringify(userData)}</code>
    </>
  );
};
