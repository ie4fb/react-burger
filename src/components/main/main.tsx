import React, { useEffect } from 'react';
import mainStyles from './main.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface IMainProps {
  children: React.ReactNode;
}
export default function Main({ children }: IMainProps) {
  


  return (
    <main className={`${mainStyles.content}`}>
      <DndProvider backend={HTML5Backend}>{children}</DndProvider>
    </main>
  );
}
