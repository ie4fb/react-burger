import modalStyles from './modal.module.css';
import { createPortal } from 'react-dom';
import ModalOvelay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

export default function Modal({ type, onClose, children }) {
  const modalContainer = document.getElementById('modalContainer');

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

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
  };  