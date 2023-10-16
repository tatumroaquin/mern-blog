import { FC, FormEvent, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './SearchPost.module.scss';

import { SearchBar } from '../../components/UI/SearchBar';
import { Spinner } from '../../components/UI/Spinner';
import { PostCard } from '../../components/UI/PostCard';
import { ConfirmModal } from '../../components/UI/ConfirmModal';
import { ErrorModal } from '../../components/UI/ErrorModal';

import { useHttpPrivate } from '../../hooks/useHttpPrivate';
import { useAuth } from '../../hooks/useAuth';

export const SearchPost: FC = () => {
  const [posts, setPosts] = useState<any>([]);
  const { isLoading, sendRequest, error, setError } = useHttpPrivate();

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [slug, setSlug] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { auth } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');

  useEffect(() => {
    setIsSignedIn(Boolean(auth?.accessToken));
    setIsAdmin(Boolean(auth?.roles?.includes('admin')));
  }, [auth, auth?.roles]);

  useEffect(() => {
    let ignore = false;
    async function searchPosts() {
      if (ignore) return;
      const abortController = new AbortController();
      const response = await sendRequest({
        url: `${import.meta.env.VITE_SERVER_URL}/post/search?q=${query}`,
        abortController,
      });
      if (response.result.data) {
        setPosts(response.result.data);
      }
      console.log(response);
    }
    searchPosts();
    return () => { ignore = true; };
  }, [query, sendRequest]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const searchValue = target.search.value;
    setSearchParams({ q: searchValue });
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

  function isPostedBySelf(username: string): boolean {
    return auth?.username === username;
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
