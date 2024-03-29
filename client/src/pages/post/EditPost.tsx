import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

import { Card } from '@ui/Card';
import { MarkDown } from '@ui/MarkDown';
import { Button } from '@ui/Button';
import { Spinner } from '@ui/Spinner';
import { ConfirmModal } from '@ui/ConfirmModal';
import { ErrorModal } from '@ui/ErrorModal';

import { postForm } from '@form/PostForm';
import { useForm } from '@hooks/useForm';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { useHttpPrivate } from '@hooks/useHttpPrivate';
import { useAuth } from '@hooks/useAuth';

import { jwtDecode } from '@util/jwtDecode';

import styles from './EditPost.module.scss';

export const EditPost = () => {
  const navigate = useNavigate();
  const [author, setAuthor] = useState<any>({});
  const [isAdmin, setIsAdmin] = useState(false);
  // when added to useEffect setMarkdown causes re-render cycles because useCallback is not used
  const [markdown, setMarkdown] = useLocalStorage('markdown');

  const { isLoading, sendRequest, error, setError } = useHttpPrivate();
  const { auth } = useAuth();
  const { slug } = useParams();
  const { form, renderForm } = useForm(postForm);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptcha, setRecaptcha] = useState('');

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
        const { title, description, markdown, author, tags } = response.post;
        setAuthor(author);
        setMarkdown(markdown);
        form.markdown.value = `# ${title}\n\n${markdown}`;
        form.description.value = description;
        form.postTags.defaultValue = tags.map((tag: string) => ({
          label: tag,
          value: tag,
        }));
      }
    };
    fetchPost();
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    recaptchaRef.current?.reset();
    setShowConfirm(true);
  }

  function onRenderMarkdown(e: FormEvent<HTMLFormElement>) {
    const { name, value } = e.target as HTMLFormElement;
    if (name !== 'markdown') return;

    setMarkdown(value);
  }

  function isPostedBySelf(author: any) {
    return author.userName === auth?.username;
  }

  async function handleConfirm() {
    setShowConfirm(false);

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
    const response = await sendRequest({
      url: `${import.meta.env.VITE_SERVER_URL}/post/edit/${slug}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        author: user.id,
        title,
        description,
        markdown,
        tags: postTags,
        recaptcha,
      }),
      abortController,
    });
    if (!response?.error) navigate('/post/all');
  }

  function handleCancel() {
    setShowConfirm(false);
  }

  function onRecaptchaChange(token: string | null) {
    setRecaptcha(token ?? '');
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
      <ErrorModal
        show={!!error}
        header='An error has occurred!'
        error={error}
        onCancel={() => setError('')}
      />
      {isLoading && <Spinner />}
      {/* // [ loadState and (self or admin) ] do not change the logical order or else tags won't appear properly */}
      {!isLoading && (isPostedBySelf(author) || isAdmin) && (
        <div className={styles['post-edit']}>
          <h1 className={styles['post-edit__title']}>Edit Post</h1>
          <Card className={styles['post-edit__form']}>
            <form ref={formRef} onSubmit={onSubmit} onBlur={onRenderMarkdown}>
              {renderForm()}
              <ReCAPTCHA
                className={styles['post-edit__form--recaptcha']}
                ref={recaptchaRef}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={onRecaptchaChange}
              />
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
