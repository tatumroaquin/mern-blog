import { FC, useState, useEffect } from 'react';
import styles from './AdminPanel.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

import { Spinner } from '@ui/Spinner';
import { Button } from '@ui/Button';
import { Card } from '@ui/Card';
import { ErrorModal } from '@ui/ErrorModal';
import { AlertModal } from '@ui/AlertModal';
import { ConfirmModal } from '@ui/ConfirmModal';

import { useHttpPrivate } from '@hooks/useHttpPrivate';

export const AdminPanel: FC = () => {
  const { isLoading, sendRequest, error, setError } = useHttpPrivate();
  const [users, setUsers] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const [userId, setUserId] = useState('');

  useEffect(() => {
    fetchAccounts();
    async function fetchAccounts() {
      const abortController = new AbortController();
      const response = await sendRequest({
        url: `${import.meta.env.VITE_SERVER_URL}/user/all`,
        abortController,
      });
      if (response.result) {
        console.log(response.result);
        setUsers(response.result.data);
      }
    }
  }, [sendRequest]);

  async function handleDeleteUser(id: string) {
    try {
      const abortController = new AbortController();
      const response = await sendRequest({
        url: `${import.meta.env.VITE_SERVER_URL}/user/delete/${id}`,
        abortController,
        method: 'DELETE',
      });
      if (response.success) {
        setAlertMessage(response.success);
        setUsers((currUsers) => {
          return currUsers.filter((user: any) => user._id !== id);
        });
      }
    } catch (e: any) {
      console.log(e);
    }
  }

  function onDeleteUser(uid: string) {
    setUserId(uid);
    setShowConfirm(true);
  }

  async function onConfirm() {
    setShowConfirm(false);
    await handleDeleteUser(userId);
  }

  function onCancel() {
    setShowConfirm(false);
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
        show={!!alertMessage}
        header='Alert'
        message={alertMessage}
        onCancel={() => setAlertMessage('')}
      />
      <ConfirmModal
        show={showConfirm}
        header='Confirm deletion'
        message='This will delete the user along with all their posts. Are you sure you want to continue?'
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
      <div className={styles['admin']}>
        <h1 className={styles['admin__heading']}>Admin Panel</h1>
        {isLoading && <Spinner />}
        {!isLoading && (
          <Card className={styles['admin__container']}>
            <table className={styles['admin__table']}>
              <thead>
                <tr>
                  <th>UID</th>
                  <th>Verified</th>
                  <th>Roles</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.length !== 0 &&
                  users.map((u: any) => (
                    <tr key={u._id}>
                      <td>{u._id}</td>
                      <td>{String(u.verified)}</td>
                      <td>{u.roles.join(',')}</td>
                      <td>{u.userName}</td>
                      <td>{u.email}</td>
                      <td>
                        <div className={styles['admin--buttons']}>
                          {!u.roles.includes('admin') && (
                            <Button
                              className={styles['admin--delete']}
                              onClick={() => onDeleteUser(u._id)}
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </>
  );
};
