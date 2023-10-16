import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ViewPost.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

import { useHttp } from '../../hooks/useHttp';
import { MarkDown } from '../../components/UI/MarkDown';
import { Button } from '../../components/UI/Button';
import { Spinner } from '../../components/UI/Spinner';
import { Card } from '../../components/UI/Card';

import { useAuth } from '../../hooks/useAuth';

export const ViewPost: FC = () => {
  const navigate = useNavigate();

  const { isLoading, sendRequest } = useHttp();
  const { slug } = useParams();
  const { auth } = useAuth();
  const [isAdmin, setIsAdmin] = useState(
    Boolean(auth?.roles?.includes('admin'))
  );
  const [isSignedIn, setIsSignedIn] = useState(Boolean(auth?.accessToken));
  const [post, setPost] = useState<any>({});

  useEffect(() => {
    setIsSignedIn(Boolean(auth?.accessToken));
    setIsAdmin(Boolean(auth?.roles?.includes('admin')));
  }, [auth?.accessToken, auth?.roles]);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchPost = async () => {
      const response = await sendRequest({
        url: `${import.meta.env.VITE_SERVER_URL}/post/view/${slug}`,
        abortController,
      });
      if (response) {
        console.log(response);
        setPost(response.post);
      }
    };
    fetchPost();
  }, [slug, sendRequest]);

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
        headers: {
          authorization: `Bearer ${auth?.accessToken}`,
        },
        withCredentials: true,
      });
      navigate('/post/all', { replace: true });
    } catch (e: any) {
      console.log(e);
    }
  }

  return (
    <>
      {isLoading && !Object.keys(post).length && <Spinner />}
      {!isLoading && !!Object.keys(post).length && (
        <div className={styles['post-view']}>
          <h1 className={styles['post-view__title']}>{post.title}</h1>
          <hr />
          <div className={styles['post-view__metadata']}>
            <div className={styles['post-view__info']}>
              <small>
                Created{' '}
                <b>{new Date(post.createdAt).toLocaleDateString('en-AU')}</b> |
                Updated{' '}
                <b>{new Date(post.updatedAt).toLocaleDateString('en-AU')}</b>
              </small>
              <small>
                Posted by{' '}
                <b>{`${post.author.firstName} ${post.author.lastName} (${post.author.userName})`}</b>
              </small>
            </div>
            {isSignedIn &&
              (isPostedBySelf(post.author.userName) || isAdmin) && (
                <div className={styles['post-view__buttons']}>
                  <Link to={`/post/edit/${post.slug}`}>
                    <Button className={styles['post-view__button']}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                  </Link>
                  <Button
                    className={styles['post-view__button']}
                    onClick={async () => await handleDeletePost(post.slug)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </Button>
                </div>
              )}
          </div>
          <hr />
          <div className={styles['post-view__tags']}>
            {post.tags.map((tag: string) => (
              <Card key={tag} className={styles['post-view__tag']}>
                {tag}
              </Card>
            ))}
          </div>
          <MarkDown markdown={post.markdown} />
        </div>
      )}
    </>
  );
};
