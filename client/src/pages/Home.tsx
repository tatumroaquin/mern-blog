import { Card } from '../components/UI/Card';
import styles from './Home.module.scss';

export const Home = () => {
  return (
    <article className={styles['home']}>
      <h1 className={styles['home__title']}>Recent Posts</h1>
      <div className={styles['posts']}>
        {[1, 2, 3].map(() => (
          <Card className={styles['post__card']}>
            <h2 className={styles['post__card--title']}>How to Title a card</h2>
            <small className={styles['post__card--description']}>
              Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
              sint cillum sint consectetur cupidatat.
            </small>
            <small className={styles['post__card--date']}>
              Created <b>July 15, 2023</b> by <b>Tatum Roaquin</b>
            </small>
          </Card>
        ))}
      </div>
    </article>
  );
};
