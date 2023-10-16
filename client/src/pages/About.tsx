import styles from './About.module.scss';

export const About = () => {
  return (
    <>
      <div className={styles['about']}>
        <h1 className={styles['about__heading']}>About</h1>
        <div className={styles['about__description']}>
          <p className={styles['about__description--text']}>
            My name is <b>Tatum Roaquin</b>, I am a Bachelor of Science in IT
            graduate from the University of Technology Sydney. I built this blog
            using the <a href='https://www.mongodb.com/mern-stack'>MERN</a>{' '}
            stack <b>(MongoDB, Express.js, React.js, Node.js)</b>. This is my
            little home on the internet, where I posts about various guides.
            Snippets of server configuration, or technical know-hows that I want
            to impart to the world.
          </p>
        </div>
      </div>
    </>
  );
};
