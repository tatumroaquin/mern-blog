import { Card } from '@ui/Card';
import styles from './Contact.module.scss';

export const Contact = () => {
  return (
    <div className={styles['contact']}>
      <h1 className={styles['contact__heading']}>Contact</h1>

      <p className={styles['contact__text']}>
        You can contact me via email{' '}
        <a href='mailto:blog@tatumroaquin.dev'>blog@tatumroaquin.dev</a> or one
        of my socials below. For privacy centric communications that require encryption. Here is my{' '}
        <a href='/tatums-pubkey.asc'>PGP Public Key</a>
      </p>

      <h2 className={styles['contact__heading']}>Socials</h2>
      <Card className={styles['contact__socials--card']}>
        <a
          className={styles['contact__socials--link']}
          href='https://www.linkedin.com/in/tatumroaquin'
          target='_blank'
          rel='noreferrer'
        >
          <img
            src='https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/linkedin.svg'
            width='32'
            height='32'
          />
          <span>LinkedIn</span>
        </a>
        <a
          className={styles['contact__socials--link']}
          href='https://github.com/tatumroaquin'
          target='_blank'
          rel='noreferrer'
        >
          <img
            src='https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/github.svg'
            width='32'
            height='32'
          />
          <span>GitHub</span>
        </a>
        <a
          className={styles['contact__socials--link']}
          href='https://www.frontendmentor.io/profile/tatumroaquin'
          target='_blank'
          rel='noreferrer'
        >
          <img
            className={styles['contact__socials--shadow']}
            src='https://www.frontendmentor.io/static/favicon/apple-touch-icon.png'
            width='32'
            height='32'
          />
          <span>Frontend Mentor</span>
        </a>
      </Card>
    </div>
  );
};
