import React from 'react';
import { ToDoItemState } from '../../types';
import ToDoItem from '../ToDoItem';
import styles from './styles.module.css';

interface ToDoItemsProps {
  items: ToDoItemState[],
  toggleEdit: (id: number) => void,
  handleEdit: (value: string, id: number) => void,
  handleClick: (id: number) => void,
  handleDelete: (id: number) => void,
}
const ToDoItems = ({
  items,
  toggleEdit,
  handleEdit,
  handleClick,
  handleDelete,
}: ToDoItemsProps) => {
  return <div className={styles.items}>
    {items.map((item) => (
      <ToDoItem
        key={item.id}
        toggleEdit={toggleEdit}
        handleEdit={handleEdit}
        handleClick={handleClick}
        handleDelete={handleDelete}
        item={item}
      />
    ))}
  </div>;
};

export default ToDoItems;
