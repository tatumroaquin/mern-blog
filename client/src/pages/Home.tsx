import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/UI/Card';
import { Spinner } from '../components/UI/Spinner';
import { useHttp } from '../hooks/useHttp';
import { useEffect } from 'react';

import styles from './Home.module.scss';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const { isLoading, sendRequest } = useHttp();

  useEffect(() => {
    const abortController = new AbortController();
    const fetchPosts = async () => {
      try {
        const response = await sendRequest({
          url: `${import.meta.env.VITE_SERVER_URL}/post/all?page=1&limit=5`,
          abortController,
        });
        if (response) {
          setPosts(response.result.data);
        }
      } catch (e: any) {
        console.log(e);
      }
    };
    fetchPosts();
  }, [sendRequest]);

  return (
    <article className={styles['home']}>
      <h1 className={styles['home__title']}>Recent Posts</h1>
      <br />
      {isLoading && <Spinner />}
      {!isLoading && posts.length === 0 && <p>No posts found</p>}
      {!isLoading && posts && (
        <div className={styles['posts']}>
          {posts.map((post: any) => (
            <Card className={styles['post__card']} key={post._id}>
              <h2 className={styles['post__card--title']}>
                <Link to={`/post/view/${post.slug}`}>{post.title}</Link>
              </h2>
              {post.description && (
                <small className={styles['post__card--description']}>
                  {post.description}
                </small>
              )}
              <small className={styles['post__card--date']}>
                Created{' '}
                <b> {new Date(post.createdAt).toLocaleDateString('en-AU')} </b>{' '}
                by{' '}
                <b>
                  <Link to={`/user/view/${post.author._id}`}>
                    {post.author.firstName} {post.author.lastName}
                  </Link>
                </b>
              </small>
            </Card>
          ))}
        </div>
      )}
    </article>
  );
};
