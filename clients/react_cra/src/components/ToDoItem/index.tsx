import React from 'react';
import { ToDoItemState, ToDoItemStatus } from '../../types';
import { ReactComponent as CheckboxSVG } from '../../assets/Checkbox__unchecked.svg';
import { ReactComponent as CheckboxCheckedSVG } from '../../assets/Checkbox__checked.svg';
import { ReactComponent as TrashBinSVG } from '../../assets/TrashBin.svg';
import { ReactComponent as EditSVG } from '../../assets/Edit.svg';
import styles from './styles.module.css';

interface ToDoItemProps {
  toggleEdit: (id: number) => void;
  handleEdit: (value: string, id: number) => void;
  handleClick: (id: number) => void;
  handleDelete: (id: number) => void;
  item: ToDoItemState;
}

interface CheckBoxProps {
  checked: boolean,
  onClick: React.MouseEventHandler
}

const CheckBox = ({ checked, onClick }: CheckBoxProps) => {
  const props = {
    onClick,
    className: [styles.action, styles.checkbox].join(' '),
  };

  if (checked) {
    return <CheckboxCheckedSVG {...props} />;
  } else {
    return <CheckboxSVG {...props} />;
  }
};

const ToDoItem = ({
  toggleEdit,
  handleEdit,
  handleClick,
  handleDelete,
  item,
}: ToDoItemProps) => {
  const onClick = (event: React.MouseEvent) => {
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
    event.stopPropagation();
  };

  const onDelete = (event: React.MouseEvent) => {
    handleDelete(item.id);
    event.stopPropagation();
  };

  const content = item.editing
    ? (
    <input
      onClick={(event) => event.stopPropagation()}
      onChange={onEdit}
      className={styles.title}
      type="text"
      value={item.title}
    />
      )
    : (
    <p className={styles.title}>{item.title}</p>
      );

  return (
    <div
      className={[
        styles.item,
        item.status === ToDoItemStatus.DONE && styles.done,
      ].join(' ')}
      onClick={() => handleClick(item.id)}
    >
      <CheckBox
        onClick={onClick}
        checked={item.status === ToDoItemStatus.DONE}
      />
      {content}
      <EditSVG
        onClick={onToggleEdit}
        className={[styles.action, styles.edit].join(' ')}
      />
      <TrashBinSVG
        onClick={onDelete}
        className={[styles.action, styles.delete].join(' ')}
      />
    </div>
  );
};

export default ToDoItem;
