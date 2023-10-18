import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter';

import remarkGfm from 'remark-gfm';
import remarkMermaid from 'remark-mermaidjs';
import oneDark from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark';

import clsx from 'clsx';
import styles from '@ui/MarkDown.module.scss';

interface Markdown {
  markdown: string;
  className?: string;
}
const onMermaidError = (node: any, _: string): any => {
  node.value = 'Error while parsing mermaidjs';
  return node.value === 'mermaid' ? { type: 'html', value: '' } : node;
};

export const MarkDown: FC<Markdown> = ({ markdown, className }) => {
  return (
    <div
      className={clsx(styles['markdown'], { [`${className}`]: !!className })}
    >
      <ReactMarkdown
        children={String(markdown)}
        remarkPlugins={[
          remarkGfm,
          [
            remarkMermaid,
            { onError: 'fallback', errorFallback: onMermaidError },
          ],
        ]}
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
    </div>
  );
};
