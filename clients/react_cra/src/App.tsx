import React, { useState } from 'react';
import classes from './App.module.css';
import ToDoItem from './components/ToDoItem';
import { ToDoItems } from './constants';
import { ToDoItemState, ToDoItemStatus } from './types';

function App () {
  const [newTitle, setNewTitle] = useState<string>('');
  const [items, setItems] = useState<ToDoItemState[]>(ToDoItems);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<ToDoItemStatus| null>(null);

  const addTodo = () => {
    if (!newTitle) return;

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

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  let displayItems = items;
  displayItems = filterStatus ? items.filter(item => item.status === filterStatus) : items;
  displayItems = searchTerm ? items.filter(item => item.title.match(new RegExp(searchTerm, 'gi'))) : displayItems;

  return (
    <div className={classes.container}>
      <div className={classes.filterBar}>
        <input placeholder="Search something..." type="text" value={searchTerm} onChange={(event) => { handleSearch(event.target.value); }} className={classes.search} />
        <div className={classes.statuses}>
          <span onClick={() => handleSetFilter(null)} className={[filterStatus === null && classes.active, classes.filterStatus].join(' ')}>All</span>
          <span onClick={() => handleSetFilter(ToDoItemStatus.ACTIVE)} className={[filterStatus === ToDoItemStatus.ACTIVE && classes.active, classes.filterStatus].join(' ')}>Active</span>
          <span onClick={() => handleSetFilter(ToDoItemStatus.DONE)} className={[filterStatus === ToDoItemStatus.DONE && classes.active, classes.filterStatus].join(' ')}>Done</span>
        </div>
      </div>
      <div className={classes.items}>
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
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              addTodo();
            }
          }}
          placeholder="Add a Task..."
          value={newTitle}
        />
        <button className={classes.add} onClick={addTodo}>ADD</button>
      </div>
    </div>
  );
}

export default App;
