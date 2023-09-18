import styles from './NotFound.module.scss';

export const NotFound = () => {
  return (
    <div className={styles['notfound']}>
      <h1 className={styles['notfound__heading']}>Not Found</h1>
      <h1 className={styles['notfound__404']}>404</h1>
      <p className={styles['notfound__description']}>The page you're trying to access does not exist.</p>
    </div>
  );
};
