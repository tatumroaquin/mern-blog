import { FC } from 'react';
import { Modal } from '@ui/Modal';
import { Button } from '@ui/Button';

interface ErrorModal {
  show: boolean;
  header: string;
  error: string;
  onCancel: () => void;
}

export const ErrorModal: FC<ErrorModal> = ({
  show,
  header,
  error = '',
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
      {error}
    </Modal>
  );
};
