import React from 'react';
import mainStyles from './main.module.css';

interface MainProps {
    children: React.ReactNode,
}
export default function Main({ children }: MainProps) {

    return (
        <main className={`${mainStyles.content} mr-5 ml-5 mt-10`}>{children}</main>
    )
}