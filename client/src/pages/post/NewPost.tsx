import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@ui/Card';
import { MarkDown } from '@ui/MarkDown';
import { Button } from '@ui/Button';
import { Spinner } from '@ui/Spinner';
import { ErrorModal } from '@ui/ErrorModal';
import { postForm } from '@form/PostForm';
import { useForm } from '@hooks/useForm';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { useHttpPrivate } from '@hooks/useHttpPrivate';
import { jwtDecode } from '@util/jwtDecode';
import { useAuth } from '@hooks/useAuth';

import styles from './NewPost.module.scss';

export const NewPost = () => {
  const navigate = useNavigate();
  const [markdown, setMarkdown] = useLocalStorage('markdown');
  const { isLoading, sendRequest, error, setError } = useHttpPrivate();
  const { auth } = useAuth();

  postForm.markdown.value = markdown;
  const { renderForm } = useForm(postForm);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let { markdown, description, postTags } = e.target as HTMLFormElement;

    const lines = markdown.value.split('\n');

    const firstLine = lines.find((str: string) => str.length !== 0);

    const title = firstLine.replace('#', '').trim();

    markdown = lines
      .filter((line: string) => line !== firstLine)
      .join('\n')
      .trim();

    description = description.value;
    if (postTags instanceof RadioNodeList)
      postTags = Object.values(postTags).map((tag: any) => tag.value);
    else if (typeof postTags.value === 'string' && postTags.value.length !== 0)
      postTags = [postTags.value];
    else postTags = [];

    const user = jwtDecode(auth?.accessToken || '');

    const abortController = new AbortController();
    const response = await sendRequest({
      url: `${import.meta.env.VITE_SERVER_URL}/post/new`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        author: user.id,
        title,
        description,
        markdown,
        tags: postTags,
      }),
      abortController,
    });
    if (!response?.error) navigate('/');
  }
  const onRenderMarkdown = (e: FormEvent<HTMLFormElement>) => {
    const { name, value } = e.target as HTMLTextAreaElement;
    if (name !== 'markdown') return;
    setMarkdown(value);
  };

  return (
    <>
      <ErrorModal
        show={!!error}
        header='Error has occurred!'
        error={error}
        onCancel={() => setError('')}
      />
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className={styles['post-new']}>
          <h1 className={styles['post-new__title']}>New Post</h1>
          <Card className={styles['post-new__form']}>
            <form
              onSubmit={onSubmit}
              onBlur={onRenderMarkdown}
            >
              {renderForm()}
              <Button>Submit</Button>
            </form>
          </Card>
          <Card className={styles['post-new__markdown']}>
            <MarkDown markdown={markdown ?? ''} />
          </Card>
        </div>
      )}
    </>
  );
};
