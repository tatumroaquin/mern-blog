import { useState, useEffect } from 'react';
import { PostCard } from '../components/UI/PostCard';
import { Spinner } from '../components/UI/Spinner';
import { Pagination } from '../components/UI/Pagination';
import { useAuth } from '../hooks/useAuth';
import { useHttpPrivate } from '../hooks/useHttpPrivate';
import styles from './AllPosts.module.scss';

const pageLimit = 5;

export const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const { isLoading, sendRequest } = useHttpPrivate();
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataLength, setDataLength] = useState(0);

  const { auth } = useAuth();

  useEffect(() => {
    setIsSignedIn(Boolean(auth?.accessToken));
  }, [auth]);

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

  return (
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
                isSignedIn={isSignedIn}
                isPostedBySelf={isPostedBySelf}
                handleDeletePost={handleDeletePost}
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
  );
};
