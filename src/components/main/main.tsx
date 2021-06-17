import React from 'react';
import mainStyles from './main.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface MainProps {
  children: React.ReactNode;
}
export default function Main({ children }: MainProps) {
  return (
    <main className={`${mainStyles.content}`}>
      <DndProvider backend={HTML5Backend}>{children}</DndProvider>
    </main>
  );
}
