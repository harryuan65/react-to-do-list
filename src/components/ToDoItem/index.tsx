import React from 'react';
import { IToDoItemState, ToDoItemStatus } from '../../types';
import { ReactComponent as CheckSVG } from '../../assets/Check.svg';
import { ReactComponent as TrashBinSVG } from '../../assets/TrashBin.svg';
import { ReactComponent as EditSVG } from '../../assets/Edit.svg';
import styles from './styles.module.css';
import Checkbox from '../Checkbox';

interface ToDoItemProps {
  toggleEdit: (id: number) => void;
  handleEdit: (value: string, id: number) => void;
  handleClick: (id: number) => void;
  handleDelete: (id: number) => void;
  item: IToDoItemState;
}

const ToDoItem = ({
  toggleEdit,
  handleEdit,
  handleClick,
  handleDelete,
  item,
}: ToDoItemProps) => {
  const onItemClick = () => handleClick(item.id);

  const onCheckboxClick = (event: React.MouseEvent) => {
    handleClick(item.id);
    event.stopPropagation();
  };

  const onToggleEdit = (event: React.MouseEvent) => {
    toggleEdit(item.id);
    event.stopPropagation();
  };

  const onEdit = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    handleEdit(target.value, item.id);
  };

  const onEnterKey = (event: React.KeyboardEvent) => event.key === 'Enter' && toggleEdit(item.id);

  const onTrashBinClick = (event: React.MouseEvent) => {
    handleDelete(item.id);
    event.stopPropagation();
  };

  const editProps = {
    onClick: onToggleEdit,
    className: [styles.action, styles.edit].join(' ')
  };

  const EditButton = item.editing
    ? <CheckSVG {...editProps}/>
    : <EditSVG {...editProps}/>;

  const content = item.editing
    ? (
      <input
        onClick={(event) => event.stopPropagation()}
        onChange={onEdit}
        onKeyDown={onEnterKey}
        className={styles.title}
        type="text"
        value={item.title}
      />
    )
    : (
      <p className={styles.title}>{item.title}</p>
    );

  const itemClasses = [
    styles.item,
    item.status === ToDoItemStatus.DONE && styles.done,
  ].join(' ');

  return (
    <div
      className={itemClasses}
      onClick={onItemClick}
    >
      <Checkbox
        onClick={onCheckboxClick}
        checked={item.status === ToDoItemStatus.DONE}
      />
      {content}
      {EditButton}
      <TrashBinSVG
        onClick={onTrashBinClick}
        className={[styles.action, styles.delete].join(' ')}
      />
    </div>
  );
};

export default ToDoItem;
