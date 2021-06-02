import React from 'react';
import linkStyles from './link.module.css';
import { useLocation, useHistory } from 'react-router-dom';

interface LinkProps {
    destination: string;
    spy: boolean;
    type?: string;
    styleAdditional: string;
    children: React.ReactNode;
    icon?: ({ type }: any) => JSX.Element;
    styleInactive?: string;
}

export default function Link({
    destination,
    spy,
    type,
    styleAdditional,
    children,
    icon,
    styleInactive,
}: LinkProps) {
    const Icon = icon ? icon : null;
    const history = useHistory();
    const location = useLocation();

    const handleRedirect = () => {
        history.push(destination);
    };

    return (
        <button
            id={type}
            onClick={handleRedirect}
            className={`${linkStyles.link} ${styleAdditional} ${type === 'header_account' ?linkStyles.link_type_account: ''}`}
        >
            {Icon && (
                <Icon
                    type={
                        location.pathname === destination && spy ? 'primary' : 'secondary'
                    }
                />
            )}
            <span
                className={`text text_type_main-default ml-2 ${location.pathname !== destination && spy ? styleInactive : ''
                    }`}
            >
                {children}
            </span>
        </button>
    );
}
