import { FormEvent, useEffect, useState } from 'react';
import { MarkDown } from '../../components/UI/MarkDown';
import { Button } from '../../components/UI/Button';
import { Spinner } from '../../components/UI/Spinner';
import { postForm } from '../../components/Form/PostForm';
import { useForm } from '../../hooks/useForm';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useHttpPrivate } from '../../hooks/useHttpPrivate';
import { jwtDecode } from '../../utility/jwtDecode';
import { useAuth } from '../../hooks/useAuth';

import styles from './EditPost.module.scss';
import { useParams } from 'react-router-dom';

export const EditPost = () => {
  // when added to useEffect setMarkdown causes re-render cycles
  // because useCallback is not used
  const [markdown, setMarkdown] = useLocalStorage('markdown');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);

  const { isLoading, sendRequest } = useHttpPrivate();
  const { auth } = useAuth();
  const { slug } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const abortController = new AbortController();
      const response = await sendRequest({
        url: `${import.meta.env.VITE_SERVER_URL}/post/view/${slug}`,
        abortController,
      });
      if (response.post) {
        const { title, markdown } = response.post;
        setMarkdown(`# ${title}\n\n${markdown}`);
        setDescription(response.post.description);
        setTags(response.post.tags);
        console.log('Response tags', tags);
      }
    };
    fetchPost();
  }, [slug, sendRequest]);

  postForm.markdown.value = markdown;
  postForm.description.value = description;
  postForm.postTags.options = tags.map(tag => ({value: tag, label: tag}))
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

    const user = jwtDecode(auth?.accessToken || '');

    const abortController = new AbortController();
    const response = await sendRequest({
      url: `${import.meta.env.VITE_SERVER_URL}/post/edit/${slug}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.id,
        title,
        description,
        markdown,
        tags: postTags,
      }),
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
        <div className={styles['post-edit']}>
          <h1 className={styles['post-edit__title']}>Edit Post</h1>
          <form
            onSubmit={onSubmit}
            onChange={onChange}
            className={styles['post-edit__form']}
          >
            {renderForm()}
            <Button>Submit</Button>
          </form>
          <MarkDown
            className={styles['post-edit__markdown']}
            children={markdown ?? ''}
          />
        </div>
      )}
    </>
  );
};