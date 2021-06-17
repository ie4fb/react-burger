import modalStyles from './modal.module.css';
import { createPortal } from 'react-dom';
import OrderDetails from '../order-details/order-details';
import ModalOvelay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details';
import PropTypes from 'prop-types';

export default function Modal({ type, onClose, isOrderModalOpen, data }) {
  const modalContainer = document.getElementById('modalContainer');

  return createPortal(
    <ModalOvelay onClose={onClose}>
      <div className={modalStyles.container}>
        <button className={modalStyles.close_button} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        {type === 'order' && <OrderDetails isOrderModalOpen={isOrderModalOpen}/>}
        {type === 'ingredient' && <IngredientDetails data={data} />}
      </div>
    </ModalOvelay>,
    modalContainer,
  );
}

Modal.propTypes = {
    type: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    isOrderModalOpen: PropTypes.bool,
  };