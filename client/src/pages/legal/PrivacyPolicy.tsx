import { FC } from 'react';
import styles from './PrivacyPolicy.module.scss';

export const PrivacyPolicy: FC = () => {
  return (
    <article className={styles['privacy-policy']}>
      <h2 className={styles['privacy-policy__heading']}>
        Website Privacy Policy
      </h2>
      <p>
        This Privacy Policy applies to all personal information collected by
        Tatum's Blog via the website located at blog.tatumroaquin.dev
      </p>
      <h3>1. What is "personal information"?</h3>
      <ol className={styles['alpha']}>
        <li>
          The Privacy Act 1988 (Cth) currently defines "personal information" as
          meaning information or an opinion about an identified individual or an
          individual who is reasonably identifiable:
          <ol className={styles['roman']}>
            <li>whether the information or opinion is true or not; and</li>
            <li>
              whether the information or opinion is recorded in a material form
              or not.
            </li>
          </ol>
        </li>
        <li>
          If the information does not disclose your identity or enable your
          identity to be ascertained, it will in most cases not be classified as
          "personal information" and will not be subject to this privacy policy.
        </li>
      </ol>
      <h3>What information do we collect?</h3>
      <ol className={styles['alpha']}>
        <li>
          The kind of personal information that we collect from you will depend
          on how you use the website. The personal information which we collect
          and hold about you may include your name(s) or username(s) and email
          address.
        </li>
        <li>
          We also collect non-personally identifiable information such as your
          browser type, IP address, and pages visited by you on the website.
        </li>
      </ol>
      <h3>How we collect your personal information</h3>
      <ol className={styles['alpha']}>
        <li>
          We may collect personal information from you whenever you input such
          information into the comments section of the website.
        </li>
        <li>
          Non-personally identifiable information is automatically recorded in
          web-server logs. This is the standard practice for any website on the
          internet.
        </li>
      </ol>
      <h3>Purpose of collection</h3>
      <ol>
        <li>
          The personal information you provide is used to address users in the
          comments section of the website. If you wish to stay anonymous, you
          may use a pseudonym instead of your legal name. You may also refrain
          from submitting your email address as it is optional.
        </li>
      </ol>
      <h3>Access and correction</h3>
      <ol>
        <li>
          Australian Privacy Principle 12 permits you to obtain access to the
          personal information we hold about you in certain circumstances, and
          Australian Privacy Principle 13 allows you to correct inaccurate
          personal information subject to certain exceptions. If you would like
          to obtain such access, please contact us as set out below.
        </li>
      </ol>
      <h3>Complaint procedure</h3>
      <ol>
        <li>
          If you have a complaint concerning the manner in which we maintain the
          privacy of your personal information, please contact us as set out
          below. All complaints will be considered by Tatum Roaquin and we may
          seek further information from you to clarify your concerns. If we
          agree that your complaint is well founded, we will, in consultation
          with you, take appropriate steps to rectify the problem. If you remain
          dissatisfied with the outcome, you may refer the matter to the Office
          of the Australian Information Commissioner.
        </li>
      </ol>
      <h3>Data sharing</h3>
      <ol>
        <li>
          Tatum's Blog does not sell, rent, or disclose your personal
          information with any third-party organisations. However, we may use
          third-party services such as <a href='https://cusdis.com/'>Cusdis</a>{' '}
          to host and store comments for the website.
        </li>
      </ol>
      <h3>Data security</h3>
      <ol>
        <li>
          We take reasonable security measures to protect any personal
          information not publicly visible on the website, such as email
          addresses, from unauthorized access.
        </li>
      </ol>
      <h3>Third-party links</h3>
      <ol>
        <li>
          Tatum's Blog may contain links to other websites that are not owned or
          controlled by us. We are not responsible for the privacy practices of
          these websites and encourage you to review their privacy policies
          before providing any personal information.
        </li>
      </ol>
      <h3>GDPR</h3>
      <ol>
        <li>
          GDPR In some circumstances, the European Union General Data Protection
          Regulation (GDPR) provides additional protection to individuals
          located in Europe. The fact that you may be located in Europe does
          not, however, on its own entitle you to protection under the GDPR. Our
          website does not specifically target visitors located in the European
          Union and we do not monitor the behaviour of individuals in the
          European Union, and accordingly the GDPR does not apply.
        </li>
      </ol>
      <h3>Children's information</h3>
      <ol>
        <li>
          Tatum's Blog does not knowingly collect any personal information from
          children under the age of 13. If you are under 13 years of age, please
          do not submit any personal information through our website.
        </li>
      </ol>
      <h3>Privacy policy changes</h3>
      <ol>
        <li>
          Tatum's Blog reserves the right to modify, change, or update this
          Privacy Policy at any time for any reason. Your continued use of the
          website after such changes is deemed as acceptance of those changes.
        </li>
      </ol>
      <h3>Consent and agreement</h3>
      <ol>
        <li>
          By using the website, you are expressing your consent to this Privacy
          Policy and agree to its terms.
        </li>
      </ol>
      <h3>How to contact us about privacy</h3>
      <ol>
        <li>
          If you have any queries, or if you seek access to your personal
          information, or if you have a complaint about our privacy practices,
          you can contact us through:{' '}
          <a href='support@tatumroaquin.dev'>support@tatumroaquin.dev</a>
        </li>
      </ol>
    </article>
  );
};
