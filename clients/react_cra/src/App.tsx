import React, { useState } from 'react';
import classes from './App.module.css';
// Local test
import { ToDoItems } from './constants';
import { ToDoItemStatus } from './types';
import { ReactComponent as Checkbox } from './assets/Checkbox__unchecked.svg';
import { ReactComponent as CheckboxChecked } from './assets/Checkbox__checked.svg';
import { ReactComponent as TrashBin } from './assets/TrashBin.svg';

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

function App() {
  const [items, setItems] = useState(ToDoItems);
  const handleClick = (id: number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          if (item.status === ToDoItemStatus.ACTIVE) {
            item.status = ToDoItemStatus.DONE;
          } else {
            item.status = ToDoItemStatus.ACTIVE;
          }
        }
        return item;
      })
    );
  };
  return (
    <div className={classes.Container}>
      <div className={classes.filterBar}>
        <input type="text" className={classes.Search} />
        <div className={classes.statuses}>
          <span className={classes.All}>All</span>
          <span className={classes.Active}>Active</span>
          <span className={classes.Done}>Done</span>
        </div>
      </div>
      <div className={classes.Items}>
        {items.map((item, i) => (
          <div
            className={classes.Item}
            key={i}
            onClick={(event) => {
              handleClick(item.id);
            }}
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
        ))}
      </div>
      <div className={classes.additionBar}>
        <input type="text" placeholder="Something on your mind?" />
        <button>ADD</button>
      </div>
    </div>
  );
}

export default App;
