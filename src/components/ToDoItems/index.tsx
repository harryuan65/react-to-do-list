import React from 'react';
import { IToDoItemState } from '../../types';
import ToDoItem from '../ToDoItem';
import styles from './styles.module.css';

interface ToDoItemsProps {
  items: IToDoItemState[],
  toggleEdit: (id: number) => void,
  handleEdit: (value: string, id: number) => void,
  handleClick: (id: number) => void,
  handleDelete: (id: number) => void,
  loading: boolean
}
const ToDoItems = (props: ToDoItemsProps) => {
  const { items, toggleEdit, handleEdit, handleClick, handleDelete, loading } = props;

  let renderToDoItems = null;

  if (items.length === 0) {
    renderToDoItems = <h2 className={styles.emptyMessage}>Oh! Looks like there is nothing to do.</h2>;
  } else {
    renderToDoItems = items.map((item) => (
      <ToDoItem
        key={item.id}
        toggleEdit={toggleEdit}
        handleEdit={handleEdit}
        handleClick={handleClick}
        handleDelete={handleDelete}
        item={item}
      />
    ));
  }
  const loader = <div className={styles.loaderCover}><div className={styles.loader}></div></div>;
  return <div className={styles.items}>
    {renderToDoItems}
    {loading && loader}
  </div>;
};

export default ToDoItems;
