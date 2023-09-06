import { useState, useEffect } from 'react';
import { PostCard } from '../components/UI/PostCard';
import { Spinner } from '../components/UI/Spinner';
import { useAuth } from '../hooks/useAuth';
import { useHttpPrivate } from '../hooks/useHttpPrivate';
import styles from './Home.module.scss';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const { isLoading, sendRequest } = useHttpPrivate();

  const [isSignedIn, setIsSignedIn] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    setIsSignedIn(Boolean(auth?.accessToken));
  }, [auth]);

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
          console.log(posts);
        }
      } catch (e: any) {
        console.log(e);
      }
    };
    fetchPosts();
  }, [sendRequest]);

  function isPostedBySelf(username: string): boolean {
    return auth?.username === username;
  }

  async function handleDeletePost(slug: string) {
    try {
      const abortController = new AbortController();
      const response = await sendRequest({
        url: `${import.meta.env.VITE_SERVER_URL}/post/delete/${slug}`,
        abortController,
        method: 'DELETE',
      });
      console.log(response);
      setPosts((currPosts) => {
        return currPosts.filter((post: any) => post.slug !== slug);
      });
    } catch (e: any) {
      console.log(e);
    }
  }

  return (
    <article className={styles['home']}>
      <h1 className={styles['home__title']}>Recent Posts</h1>
      <br />
      {isLoading && <Spinner />}
      {!isLoading && posts.length === 0 && <p>No posts found</p>}
      {!isLoading && posts && (
        <div className={styles['posts']}>
          {posts.map((post: any) => (
            <PostCard
              key={post.slug}
              isSignedIn={isSignedIn}
              isPostedBySelf={isPostedBySelf}
              handleDeletePost={handleDeletePost}
              post={post}
            />
          ))}
        </div>
      )}
    </article>
  );
};
