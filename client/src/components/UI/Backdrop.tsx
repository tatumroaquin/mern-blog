import { FC } from 'react';
import { createPortal } from 'react-dom';

import styles from '@ui/Backdrop.module.scss';

interface Backdrop {
  onCancel: () => void;
}

export const Backdrop: FC<Backdrop> = ({ onCancel }) => {
  return createPortal(
    <div className={styles['backdrop']} onClick={onCancel}></div>,
    document.getElementById('backdrop-hook') as Element
  );
};
