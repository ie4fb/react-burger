import modalStyles from './modal.module.css';
import { createPortal } from 'react-dom';
import ModalOvelay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const modalContainer = document.getElementById(
    'modalContainer',
  ) as HTMLElement;

  return createPortal(
    <ModalOvelay onClose={onClose}>
      <div className={modalStyles.container}>
        <button className={modalStyles.close_button} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </ModalOvelay>,
    modalContainer,
  );
}
