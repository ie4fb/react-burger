import modalStyles from './modal.module.css';
import { createPortal } from 'react-dom';
import OrderDetails from '../order-details/order-details';
import ModalOvelay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { RESET_ORDER_DETAILS } from '../../services/actions/order';
import { RESET_INGREDIENT_DATA } from '../../services/actions/ingredient-details';

export default function Modal({ type, onClose, isOrderModalOpen }) {
  const modalContainer = document.getElementById('modalContainer');

  const dispatch = useDispatch();

  const handleClose = () => {
    if (type==='order') {
      dispatch({
        type: RESET_ORDER_DETAILS
      })
    } else {
      dispatch({
        type: RESET_INGREDIENT_DATA
      })
    }
    onClose();
  }

  return createPortal(
    <ModalOvelay onClose={handleClose}>
      <div className={modalStyles.container}>
        <button className={modalStyles.close_button} onClick={handleClose}>
          <CloseIcon type="primary" />
        </button>
        {type === 'order' && <OrderDetails isOrderModalOpen={isOrderModalOpen}/>}
        {type === 'ingredient' && <IngredientDetails />}
      </div>
    </ModalOvelay>,
    modalContainer,
  );
}

Modal.propTypes = {
    type: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    isOrderModalOpen: PropTypes.bool,
  };