import { useEffect, useRef } from 'react';
import overlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export default function ModalOvelay({ children, onClose }) {

    const overlayRef = useRef();
  useEffect(() => {
    function closeModalWithEsc(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    function closeModalWithClick(e) {
      if (e.target.classList === overlayRef.current.classList) {
        onClose();
      }
    }
    if (overlayRef.current) {
      document.addEventListener('mousedown', closeModalWithClick);
      document.addEventListener('keydown', closeModalWithEsc);
    }

    return () => {
      document.removeEventListener('mousedown', closeModalWithClick);
      document.removeEventListener('keydown', closeModalWithEsc);
    };
  }, [children, onClose, overlayRef]);

  return <div ref={overlayRef} className={overlayStyles.overlay}>{children}</div>;
}

ModalOvelay.propTypes = {
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired
  };