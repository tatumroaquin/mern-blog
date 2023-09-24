import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Card } from '../../components/UI/Card';
import { MarkDown } from '../../components/UI/MarkDown';
import { Button } from '../../components/UI/Button';
import { Spinner } from '../../components/UI/Spinner';
import { ConfirmModal } from '../../components/UI/ConfirmModal';

import { postForm } from '../../components/Form/PostForm';
import { useForm } from '../../hooks/useForm';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useHttpPrivate } from '../../hooks/useHttpPrivate';
import { useAuth } from '../../hooks/useAuth';

import { jwtDecode } from '../../utility/jwtDecode';

import styles from './EditPost.module.scss';

export const EditPost = () => {
  const navigate = useNavigate();
  const [author, setAuthor] = useState<any>({});
  const [isAdmin, setIsAdmin] = useState(false);
  // when added to useEffect setMarkdown causes re-render cycles because useCallback is not used
  const [markdown, setMarkdown] = useLocalStorage('markdown');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const { isLoading, sendRequest } = useHttpPrivate();
  const { auth } = useAuth();
  const { slug } = useParams();
  const { form, renderForm } = useForm(postForm);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setIsAdmin(Boolean(auth?.roles?.includes('admin')));
  }, [auth?.roles]);

  useEffect(() => {
    const fetchPost = async () => {
      const abortController = new AbortController();
      const response = await sendRequest({
        url: `${import.meta.env.VITE_SERVER_URL}/post/view/${slug}`,
        abortController,
      });
      if (response.post) {
        const { title, markdown } = response.post;
        setAuthor(response.post.author);
        setMarkdown(`# ${title}\n\n${markdown}`);
        setDescription(response.post.description);
        setTags(response.post.tags);
      }
    };
    fetchPost();
  }, [slug, sendRequest]);

  form.markdown.value = markdown;
  form.description.value = description;
  form.postTags.defaultValue = tags.map((tag) => ({
    label: tag,
    value: tag,
  }));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowConfirm(true);
  }

  function onChange(e: FormEvent<HTMLFormElement>) {
    const { name, value } = e.target as HTMLFormElement;
    if (name === 'markdown') setMarkdown(value);
    if (name === 'description') setDescription(value);
  }

  function isPostedBySelf(author: any) {
    return author.userName === auth?.username;
  }

  async function handleConfirm() {
    let { markdown, description, postTags } =
      formRef.current as HTMLFormElement;

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
    await sendRequest({
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
    setShowConfirm(false);
    navigate('/post/all');
  }

  function handleCancel() {
    setShowConfirm(false);
  }

  return (
    <>
      <ConfirmModal
        show={showConfirm}
        header='Confirm edit action'
        message='This action cannot be reversed, are you sure you want to edit this post?'
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      {isLoading && <Spinner />}
      {/* // [ loadState and (self or admin) ] do not change the logical order or else tags won't appear properly */}
      {!isLoading && (isPostedBySelf(author) || isAdmin) && (
        <div className={styles['post-edit']}>
          <h1 className={styles['post-edit__title']}>Edit Post</h1>
          <Card className={styles['post-edit__form']}>
            <form ref={formRef} onSubmit={onSubmit} onChange={onChange}>
              {renderForm()}
              <Button>Submit</Button>
            </form>
          </Card>
          <Card className={styles['post-edit__markdown']}>
            <MarkDown markdown={markdown ?? ''} />
          </Card>
        </div>
      )}
    </>
  );
};
