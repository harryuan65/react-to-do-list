import React, { useState } from 'react';
import classes from './App.module.css';
import ToDoItem from './components/ToDoItem';
import { ToDoItems } from './constants';
import { ToDoItemState, ToDoItemStatus } from './types';

function App () {
  const [newTitle, setNewTitle] = useState<string>('');
  const [items, setItems] = useState<ToDoItemState[]>(ToDoItems);
  const [filterStatus, setFilterStatus] = useState<ToDoItemStatus| null>(null);

  const addTodo = () => {
    setItems([
      ...items,
      { id: items.length + 1, title: newTitle, status: ToDoItemStatus.ACTIVE },
    ]);
    setNewTitle('');
  };

  const toggleEdit = (id: number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          item.editing = !item.editing;
        }
        return item;
      })
    );
  };

  const handleEdit = (value: string, id: number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          item.title = value;
        }
        return item;
      })
    );
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

  const handleDelete = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleSetFilter = (status: ToDoItemStatus | null) => {
    setFilterStatus(status);
  };

  const displayItems = filterStatus ? items.filter(item => item.status === filterStatus) : items;

  return (
    <div className={classes.Container}>
      <div className={classes.filterBar}>
        <input type="text" className={classes.Search} />
        <div className={classes.statuses}>
          <span onClick={() => handleSetFilter(null)} className={[filterStatus === null && classes.active, classes.filterStatus].join(' ')}>All</span>
          <span onClick={() => handleSetFilter(ToDoItemStatus.ACTIVE)} className={[filterStatus === ToDoItemStatus.ACTIVE && classes.active, classes.filterStatus].join(' ')}>Active</span>
          <span onClick={() => handleSetFilter(ToDoItemStatus.DONE)} className={[filterStatus === ToDoItemStatus.DONE && classes.active, classes.filterStatus].join(' ')}>Done</span>
        </div>
      </div>
      <div className={classes.Items}>
        {displayItems.map((item) => (
          <ToDoItem
            key={item.id}
            toggleEdit={toggleEdit}
            handleEdit={handleEdit}
            handleClick={handleClick}
            handleDelete={handleDelete}
            item={item}
          />
        ))}
      </div>
      <div className={classes.additionBar}>
        <input
          type="text"
          onChange={({ target }) => {
            setNewTitle(target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              addTodo();
            }
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
