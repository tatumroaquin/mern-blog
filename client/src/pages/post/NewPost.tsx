import { FormEvent } from 'react';
import { MarkDown } from '../../components/UI/MarkDown';
import { Button } from '../../components/UI/Button';
import { postForm } from '../../components/Form/PostForm';
import { useForm } from '../../hooks/useForm';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import styles from './NewPost.module.scss';

export const NewPost = () => {
  const [markdown, setMarkdown] = useLocalStorage('markdown');

  postForm.markdown.value = markdown;
  const { renderForm } = useForm(postForm);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
  }

  function onChange(e: FormEvent<HTMLFormElement>) {
    const { name, value } = e.target as HTMLFormElement;
    if (name !== 'markdown') return;
    setMarkdown(value);
  }
  return (
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
  );
};
