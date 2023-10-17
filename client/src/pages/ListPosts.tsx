import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { PostCard } from '@ui/PostCard';
import { Spinner } from '@ui/Spinner';
import { Pagination } from '@ui/Pagination';
import { ConfirmModal } from '@ui/ConfirmModal';

import { useAuth } from '@hooks/useAuth';
import { useHttpPrivate } from '@hooks/useHttpPrivate';
import styles from './ListPosts.module.scss';

const pageLimit = 10;

export const ListPosts = () => {
  const [author, setAuthor] = useState('User Posts');
  const [posts, setPosts] = useState([]);
  const { isLoading, sendRequest } = useHttpPrivate();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [slug, setSlug] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataLength, setDataLength] = useState(0);

  const { auth } = useAuth();

  const { userId } = useParams();

  useEffect(() => {
    setIsSignedIn(Boolean(auth?.accessToken));
    setIsAdmin(Boolean(auth?.roles?.includes('admin')));
  }, [auth, auth?.roles]);

  useEffect(() => {
    let ignore = false;
    const abortController = new AbortController();
    const fetchPosts = async () => {
      if (ignore) return;
      try {
        const response = await sendRequest({
          url: `${
            import.meta.env.VITE_SERVER_URL
          }/post/uid/${userId}?page=${currentPage}&limit=${pageLimit}`,
          abortController,
        });
        if (response.result.data) {
          setPosts(response.result.data);
          setDataLength(response.result.total);
        }
        if (response.result.author) {
          const { firstName, lastName } = response.result.author;
          setAuthor(`${firstName} ${lastName}`);
        }
      } catch (e: unknown) {
        if (e instanceof Error) console.error(e.message);
      }
    };
    fetchPosts();
    return () => {
      ignore = true;
    };
  }, [currentPage, userId, sendRequest]);

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
        message='This action is permanent and cannot be reversed! Are you sure you want to delete this post?'
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
      <article className={styles['list-posts']}>
        <h1 className={styles['list-posts__title']}>{author}</h1>
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
            <div className={styles['list-posts__data']}>
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
