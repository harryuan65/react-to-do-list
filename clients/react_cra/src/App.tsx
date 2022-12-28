import React, { useState } from 'react';
import classes from './App.module.css';
import ToDoItem from './components/ToDoItem';
import { ToDoItems } from './constants';
import { ToDoItemData, ToDoItemStatus } from './types';

function App() {
  const [newTitle, setNewTitle] = useState<string>('');
  const [items, setItems] = useState<ToDoItemData[]>(ToDoItems);

  const addTodo = () => {
    setItems([
      ...items,
      { id: items.length + 1, title: newTitle, status: ToDoItemStatus.ACTIVE },
    ]);
    setNewTitle('');
  };

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
        {items.map((item) => (
          <ToDoItem key={item.id} handleClick={handleClick} item={item} />
        ))}
      </div>
      <div className={classes.additionBar}>
        <input
          type="text"
          onChange={({ target }) => {
            setNewTitle(target.value);
          }}
          placeholder="Something on your mind?"
          value={newTitle}
        />
        <button onClick={addTodo}>ADD</button>
      </div>
    </div>
  );
}

export default App;
