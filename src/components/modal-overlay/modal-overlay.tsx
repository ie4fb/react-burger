import React, { useEffect, useRef } from 'react';
import overlayStyles from './modal-overlay.module.css';

interface IModalProps {
  children: React.ReactNode;
  onClose: () => void;
}
type IKeyboardEvent = Event & {
  key: string;
};

export default function ModalOvelay({ children, onClose }: IModalProps) {
  const overlayRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  useEffect(() => {
    const closeModalWithEsc = (e: IKeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    function closeModalWithClick(e: Event) {
      const target = e.target as HTMLDivElement;
      if (
        overlayRef.current &&
        target.classList === overlayRef.current.classList
      ) {
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

  return (
    <div ref={overlayRef} className={overlayStyles.overlay}>
      {children}
    </div>
  );
}
