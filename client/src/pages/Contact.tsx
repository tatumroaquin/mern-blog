import { Card } from '../components/UI/Card';
import styles from './Contact.module.scss';

export const Contact = () => {
  return (
    <div className={styles['contact']}>
      <h1>Contact</h1>

      <p>You can contact me via email <a href="mailto:blog@tatumroaquin.dev">blog@tatumroaquin.dev</a> or one of my socials below</p>
      <p>For the nerds who like privacy here is my <a href="/tatums-pubkey.asc">PGP Public Key</a></p>

      <h2>Socials</h2>
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
          target='_blank' rel='noreferrer'
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
        <a
          className={styles['contact__socials--link']}
          href='https://discord.com/users/ormux'
          target='_blank'
          rel='noreferrer'
        >
          <img
            src='https://raw.githubusercontent.com/danielcranney/profileme-dev/main/public/icons/socials/discord.svg'
            width='32'
            height='32'
          />
          <span>Discord</span>
        </a>
      </Card>
    </div>
  );
};
