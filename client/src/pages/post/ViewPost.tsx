import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import oneDark from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark';

import styles from './ViewPost.module.scss';

interface ViewPost {
  children: string;
}

export const ViewPost: FC<ViewPost> = ({ children }) => {
  return (
    <article className={styles['post']}>
      <h1 className={styles['title']}>How to Title</h1>
      <div className={styles['date']}>
        <small>
          Created <b>June 14, 2023</b> | Updated <b>June 23, 2023</b>
        </small>
        <small>
          Posted by <b>Tatum Roaquin</b>
        </small>
      </div>

      <ReactMarkdown
        children={children}
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
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
  );
};
