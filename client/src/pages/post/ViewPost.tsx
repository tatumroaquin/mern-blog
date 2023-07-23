import { FC, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import oneDark from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark';

import styles from './ViewPost.module.scss';
import { useHttp } from '../../hooks/useHttp';
import { useParams } from 'react-router-dom';

export const ViewPost: FC = () => {
  const { isLoading, sendRequest } = useHttp();
  const { slug } = useParams();
  const [post, setPost] = useState<any>();

  useEffect(() => {
    const fetchPost = async () => {
      const abortController = new AbortController();
      const response = await sendRequest({
        url: `${import.meta.env.VITE_SERVER_URL}/post/view/${slug}`,
        abortController,
      });
      console.log(response);
      if (response) setPost(response.post);
    };
    fetchPost();
  }, [slug, sendRequest]);

  return (
    <>
      {!isLoading && post && (
        <article className={styles['post']}>
          <h1 className={styles['title']}>{post.title}</h1>
          <div className={styles['date']}>
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

          <ReactMarkdown
            children={post.markdown}
            remarkPlugins={[remarkGfm]}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    style={oneDark}
                    language={match[1]}
                    PreTag='div'
                  />
                ) : (
                  <code {...props} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </article>
      )}
    </>
  );
};
