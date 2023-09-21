import { FC } from 'react';
import ReactDOM from 'react-dom';
import { Card } from './Card';
import { Backdrop } from './Backdrop';
import styles from './Modal.module.scss';

interface Overlay {
  header: string;
  footer: JSX.Element;
  children: string;
}

interface Modal extends Overlay {
  show: boolean;
  onCancel: () => void;
}

const Overlay: FC<Overlay> = ({ header, footer, children }) => {
  const overlay = (
    <Card className={styles['modal']}>
      <div className={styles['modal__form']}>
        <header className={styles['modal__header']}>
          <h3>{header}</h3>
        </header>
        <div className={styles['modal__content']}>
          <p>{children}</p>
        </div>
        <footer className={styles['modal__footer']}>{footer}</footer>
      </div>
    </Card>
  );
  return ReactDOM.createPortal(
    overlay,
    document.getElementById('modal-hook') as Element
  );
};

export const Modal: FC<Modal> = ({
  show,
  header,
  footer,
  children,
  onCancel,
}) => {
  return (
    <>
      {show && <Backdrop onCancel={onCancel} />}
      {show && <Overlay header={header} footer={footer} children={children} />}
    </>
  );
};
