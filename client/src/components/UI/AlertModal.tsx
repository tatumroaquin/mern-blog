import { FC } from 'react';
import { Modal } from '@ui/Modal';
import { Button } from '@ui/Button';

interface AlertModal {
  show: boolean;
  header: string;
  message: string;
  onCancel: () => void;
}

export const AlertModal: FC<AlertModal> = ({
  show,
  header,
  message = '',
  onCancel,
}) => {
  return (
    <Modal
      show={show}
      header={header}
      footer={
        <>
          <Button onClick={onCancel}>Ok</Button>
        </>
      }
      onCancel={onCancel}
    >
      {message}
    </Modal>
  );
};
