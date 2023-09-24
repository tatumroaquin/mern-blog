import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

import { useHttpPrivate } from '../hooks/useHttpPrivate';
import { Spinner } from '../components/UI/Spinner';

import { Button } from '../components/UI/Button';
import { Card } from '../components/UI/Card';

import styles from './AdminPanel.module.scss';

export const AdminPanel: FC = () => {
  const { isLoading, sendRequest } = useHttpPrivate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAccounts();
    async function fetchAccounts() {
      const abortController = new AbortController();
      const response = await sendRequest({
        url: `${import.meta.env.VITE_SERVER_URL}/user/all?limit=5&page=1`,
        abortController,
      });
      if (response.result) {
        setUsers(response.result.data);
      }
    }
  }, [sendRequest]);

  return (
    <div className={styles['admin']}>
      <h1 className={styles['admin__heading']}>Admin Panel</h1>
      {isLoading && <Spinner />}
      {!isLoading && (
        <Card>
          <table className={styles['admin__table']}>
            <thead>
              <tr>
                <th>UID</th>
                <th>Roles</th>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length !== 0 &&
                users.map((u: any) => (
                  <tr key={u._id}>
                    <td>{u._id}</td>
                    <td>{u.roles.join(',')}</td>
                    <td>{u.userName}</td>
                    <td>{u.email}</td>
                    <td>
                      <div className={styles['admin--buttons']}>
                        <Link to={`/admin/delete`}>
                          <Button className={styles['admin--edit']}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </Button>
                        </Link>
                        <Button className={styles['admin--delete']}>
                          <FontAwesomeIcon icon={faTrashCan} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
};
