import { useState, useEffect } from 'react';

import { PostCard } from '@ui/PostCard';
import { Spinner } from '@ui/Spinner';
import { ConfirmModal } from '@ui/ConfirmModal';
import { ErrorModal } from '@ui/ErrorModal';

import { useAuth } from '@hooks/useAuth';
import { useHttpPrivate } from '@hooks/useHttpPrivate';

import styles from './Home.module.scss';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const { isLoading, sendRequest, error, setError } = useHttpPrivate();

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { auth } = useAuth();

  const [slug, setSlug] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsSignedIn(Boolean(auth?.accessToken));
    setIsAdmin(Boolean(auth?.roles?.includes('admin')));
  }, [auth, auth?.roles]);

  useEffect(() => {
    let ignore = false;
    const fetchPosts = async () => {
      if (ignore) return;
      const abortController = new AbortController();
      const response = await sendRequest({
        url: `${import.meta.env.VITE_SERVER_URL}/post/all?page=1&limit=5`,
        abortController,
      });
      if (response.result) {
        setPosts(response.result.data);
      }
    };
    fetchPosts();
    return () => {
      ignore = true;
    };
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

  function onDeletePost(slug: string) {
    setSlug(slug);
    setShowModal(true);
  }

  async function onConfirm() {
    setShowModal(false);
    await handleDeletePost(slug);
  }

  function onCancel() {
    setShowModal(false);
  }

  return (
    <>
      <ErrorModal
        show={!!error}
        header='Error has occurred!'
        error={error}
        onCancel={() => setError('')}
      />
      <ConfirmModal
        show={showModal}
        header='Confirm delete action'
        message='This action is permanent and cannot be reversed. Are you sure you want to edit this post?'
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
      <article className={styles['home']}>
        <h1 className={styles['home__title']}>Recent Posts</h1>
        <br />
        {isLoading && <Spinner />}
        {!isLoading && posts.length === 0 && <p>No posts found</p>}
        {!isLoading && posts && (
          <div className={styles['home__posts']}>
            {posts.map((post: any) => (
              <PostCard
                key={post.slug}
                isAdmin={isAdmin}
                isSignedIn={isSignedIn}
                isPostedBySelf={isPostedBySelf}
                onDeletePost={onDeletePost}
                post={post}
              />
            ))}
          </div>
        )}
      </article>
    </>
  );
};
