import { FC, FormEvent, useState, useEffect } from 'react';
import styles from './SearchPost.module.scss';

import { SearchBar } from '../../components/UI/SearchBar';
import { Spinner } from '../../components/UI/Spinner';
import { PostCard } from '../../components/UI/PostCard';
import { ConfirmModal } from '../../components/UI/ConfirmModal';

import { useHttpPrivate } from '../../hooks/useHttpPrivate';
import { useAuth } from '../../hooks/useAuth';

export const SearchPost: FC = () => {
  const [posts, setPosts] = useState<any>([]);
  const { isLoading, sendRequest } = useHttpPrivate();

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [slug, setSlug] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { auth } = useAuth();

  useEffect(() => {
    setIsSignedIn(Boolean(auth?.accessToken));
    setIsAdmin(Boolean(auth?.roles?.includes('admin')));
  }, [auth, auth?.roles]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const query = target.search.value;
    const abortController = new AbortController();
    const response = await sendRequest({
      url: `${import.meta.env.VITE_SERVER_URL}/post/search?q=${query}`,
      abortController,
    });
    if (response.result.data) {
      setPosts(response.result.data);
    }
  }

  function isPostedBySelf(username: string): boolean {
    return auth?.username === username;
  }

  async function handleDeletePost(slug: string) {
    try {
      const abortController = new AbortController();
      await sendRequest({
        url: `${import.meta.env.VITE_SERVER_URL}/post/delete/${slug}`,
        abortController,
        method: 'DELETE',
      });
      setPosts((currPosts: any) => {
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
      <ConfirmModal
        show={showModal}
        header='Confirm delete action'
        message='This action is permanent and cannot be reversed! Are you sure you want to delete this post?'
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
      <div className={styles['searchpost']}>
        <h1 className={styles['searchpost__title']}>Search Posts</h1>
        <SearchBar onSubmit={onSubmit} />
        {isLoading && <Spinner />}
        {!isLoading && posts.length === 0 && <p>No results found</p>}
        {!isLoading && posts.length !== 0 && (
          <div className={styles['searchpost__data']}>
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
      </div>
    </>
  );
};