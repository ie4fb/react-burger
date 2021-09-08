import React from 'react';
import linkStyles from './link.module.css';
import { useLocation, useHistory } from 'react-router-dom';

interface LinkProps {
  destination: string;
  spy: boolean;
  type?: string;
  styleAdditional: string;
  children: React.ReactNode;
  Icon?: React.ComponentClass<{type: string}>;
  styleInactive?: string;
  textSize: string;
}

export default function Link({
  destination,
  spy,
  type,
  styleAdditional,
  children,
  Icon,
  styleInactive,
  textSize
}: LinkProps) {

  const history = useHistory();
  const location = useLocation();

  const handleRedirect = () => {
    history.replace(destination, {from: location.pathname});
  };

  return (
    <button
      id={type}
      onClick={handleRedirect}
      className={`${linkStyles.link} ${styleAdditional} ${
        type === 'header_account' ? linkStyles.link_type_account : ''
      }`}
    >
      {Icon && (
        <Icon
          type={
            location.pathname === destination && spy ? 'primary' : 'secondary'
          }
        />
      )}
      <span
        className={`${linkStyles.text} ${
          location.pathname === destination && spy ? ' ' : 'text_color_inactive'
        } text text_type_main-${textSize} ml-2 `}
      >
        {children}
      </span>
    </button>
  );
}
