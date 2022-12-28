import React, { useState } from 'react';
import classes from './App.module.css';
// Local test
import { ToDoItems } from './constants';
import { ToDoItemStatus } from './types';

function App() {
  const [items, setItems] = useState(ToDoItems);
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
          <div className={classes.Item} key={i}>
            <input
              type="checkbox"
              checked={item.status === ToDoItemStatus.DONE}
            />
            <span>{item.title}</span>
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
