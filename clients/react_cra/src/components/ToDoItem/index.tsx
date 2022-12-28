import React from 'react';
import { ToDoItemData, ToDoItemStatus } from '../../types';
import { ReactComponent as Checkbox } from '../../assets/Checkbox__unchecked.svg';
import { ReactComponent as CheckboxChecked } from '../../assets/Checkbox__checked.svg';
import { ReactComponent as TrashBin } from '../../assets/TrashBin.svg';
import classes from './style.module.css';

interface ToDoItemProps {
  handleClick: (id: number) => void;
  item: ToDoItemData;
}

const CheckBox = ({
  checked,
  onClick,
}: {
  checked: boolean;
  onClick: React.MouseEventHandler;
}) => {
  let props = {
    onClick,
    className: [classes.Action, classes.Checkbox].join(' '),
  };
  if (checked) {
    return <CheckboxChecked {...props} />;
  } else {
    return <Checkbox {...props} />;
  }
};

const ToDoItem = ({ handleClick, item }: ToDoItemProps) => (
  <div
    className={[
      classes.Item,
      item.status === ToDoItemStatus.DONE && classes.Done,
    ].join(' ')}
    onClick={() => handleClick(item.id)}
  >
    <CheckBox
      onClick={(event) => {
        handleClick(item.id);
        event.stopPropagation();
      }}
      checked={item.status === ToDoItemStatus.DONE}
    />
    <p className={classes.Title}>{item.title}</p>
    <TrashBin className={[classes.Action, classes.Delete].join(' ')} />
  </div>
);

export default ToDoItem;
