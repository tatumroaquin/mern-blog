import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';

import { Card } from '@ui/Card';
import { Button } from '@ui/Button';

import styles from '@ui/PostCard.module.scss';

interface PostCard {
  isAdmin: boolean;
  isSignedIn: boolean;
  isPostedBySelf: (username: string) => boolean;
  onDeletePost: (slug: string) => void;
  post: any;
}

export const PostCard: FC<PostCard> = ({
  isAdmin,
  isSignedIn,
  isPostedBySelf,
  onDeletePost,
  post,
}) => {
  return (
    <Card className={styles['post__card']} key={post._id}>
      <h2 className={styles['post__card--title']}>
        <Link to={`/post/view/${post.slug}`}>{post.title}</Link>
      </h2>
      {post.description && (
        <small className={styles['post__card--description']}>
          {post.description}
        </small>
      )}
      <small className={styles['post__card--tags']}>
        {post.tags.map((tag: string) => (
          <Card key={tag} className={styles['post__card--tag']}>
            {tag}
          </Card>
        ))}
      </small>
      <small className={styles['post__card--date']}>
        <div>
          <b> {new Date(post.createdAt).toLocaleDateString('en-AU')} </b>
          <b>
            <Link to={`/user/view/${post.author._id}`}>
              {post.author.firstName} {post.author.lastName}
            </Link>
          </b>
        </div>
        {isSignedIn && (isPostedBySelf(post.author.userName) || isAdmin) && (
          <div className={styles['post__card--buttons']}>
            <Link to={`/post/edit/${post.slug}`}>
              <Button className={styles['post__card--edit']}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </Button>
            </Link>
            <Button
              className={styles['post__card--delete']}
              onClick={() => onDeletePost(post.slug)}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </Button>
          </div>
        )}
      </small>
    </Card>
  );
};
