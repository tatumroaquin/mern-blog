import { FC } from 'react';
import { Modal } from '@ui/Modal';
import { Button } from '@ui/Button';

interface ConfirmModal {
  show: boolean;
  header: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmModal: FC<ConfirmModal> = ({
  show,
  header,
  message = '',
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal
      show={show}
      header={header}
      footer={
        <>
          <Button onClick={onConfirm}>Yes</Button>
          <Button onClick={onCancel}>No</Button>
        </>
      }
      onCancel={onCancel}
    >
      {message}
    </Modal>
  );
};
