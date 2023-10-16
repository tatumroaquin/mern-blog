import { useState, useEffect } from 'react';

import { PostCard } from '@ui/PostCard';
import { Spinner } from '@ui/Spinner';
import { Pagination } from '@ui/Pagination';
import { ConfirmModal } from '@ui/ConfirmModal';

import { useAuth } from '@hooks/useAuth';
import { useHttpPrivate } from '@hooks/useHttpPrivate';
import styles from './AllPosts.module.scss';

const pageLimit = 10;

export const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const { isLoading, sendRequest } = useHttpPrivate();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [slug, setSlug] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataLength, setDataLength] = useState(0);

  const { auth } = useAuth();

  useEffect(() => {
    setIsSignedIn(Boolean(auth?.accessToken));
    setIsAdmin(Boolean(auth?.roles?.includes('admin')));
  }, [auth, auth?.roles]);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchPosts = async () => {
      try {
        const response = await sendRequest({
          url: `${
            import.meta.env.VITE_SERVER_URL
          }/post/all?page=${currentPage}&limit=${pageLimit}`,
          abortController,
        });
        if (response) {
          setPosts(response.result.data);
          setDataLength(response.result.total);
        }
      } catch (e: any) {
        console.log(e);
      }
    };
    fetchPosts();
  }, [currentPage, sendRequest]);

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
      <ConfirmModal
        show={showModal}
        header='Confirm delete action'
        message="This action is permanent and cannot be reversed! Are you sure you want to delete this post?"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
      <article className={styles['all-posts']}>
        <h1 className={styles['all-posts__title']}>All Posts</h1>
        <br />
        {isLoading && <Spinner />}
        {!isLoading && posts.length === 0 && <p>No posts found</p>}
        {!isLoading && posts && (
          <>
            <Pagination
              dataLength={dataLength}
              currentPage={currentPage}
              pageLimit={pageLimit}
              onPageChange={setCurrentPage}
            />
            <div className={styles['all-posts__data']}>
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
            <Pagination
              dataLength={dataLength}
              currentPage={currentPage}
              pageLimit={pageLimit}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </article>
    </>
  );
};
