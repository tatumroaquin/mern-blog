import { FormEvent } from 'react';
import { MarkDown } from '../../components/UI/MarkDown';
import { Button } from '../../components/UI/Button';
import { Spinner } from '../../components/UI/Spinner';
import { postForm } from '../../components/Form/PostForm';
import { useForm } from '../../hooks/useForm';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useHttpPrivate } from '../../hooks/useHttpPrivate';

import styles from './NewPost.module.scss';

export const NewPost = () => {
  const [markdown, setMarkdown] = useLocalStorage('markdown');
  const { isLoading, sendRequest } = useHttpPrivate();

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

    console.log('title', title);
    console.log('markdown', markdown);
    console.log('description', description);
    console.log('tags', postTags);

    const abortController = new AbortController();
    const response = await sendRequest({
      url: `${import.meta.env.VITE_SERVER_URL}/post/new`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, markdown, tags: postTags }),
      abortController,
    });
    console.log(response);
  }

  function onChange(e: FormEvent<HTMLFormElement>) {
    const { name, value } = e.target as HTMLFormElement;
    if (name !== 'markdown') return;
    setMarkdown(value);
  }

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className={styles['post-new']}>
          <form
            onChange={onChange}
            onSubmit={onSubmit}
            className={styles['post-new__form']}
          >
            {renderForm()}
            <Button>Submit</Button>
          </form>
          <MarkDown
            className={styles['post-new__markdown']}
            children={markdown ?? ''}
          />
        </div>
      )}
    </>
  );
};
