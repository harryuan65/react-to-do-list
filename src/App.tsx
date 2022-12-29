import React, { useState } from 'react';
import classes from './App.module.css';
import ToDoItems from './components/ToDoItems';
import { DummyToDoItems } from './constants';
import { ToDoItemState, ToDoItemStatus } from './types';

function App () {
  const [newTitle, setNewTitle] = useState<string>('');
  const [items, setItems] = useState<ToDoItemState[]>(DummyToDoItems);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<ToDoItemStatus| null>(null);

  const addTodo = () => {
    // Prevent creating empty to-dos
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

  let filteredItems: ToDoItemState[] = items;
  filteredItems = filterStatus ? items.filter(item => item.status === filterStatus) : items;
  filteredItems = searchTerm ? items.filter(item => item.title.match(new RegExp(searchTerm, 'gi'))) : filteredItems;

  // Add active class to span when current filter status matches with it
  const statusClassesFor = (targetStatus: ToDoItemStatus | null) => {
    return [filterStatus === targetStatus && classes.active, classes.filterStatus].join(' ');
  };

  return (
    <div className={classes.container}>
      <div className={classes.filterBar}>
        <input placeholder="Search something..." type="text" value={searchTerm} onChange={(event) => { handleSearch(event.target.value); }} className={classes.search} />
        <div className={classes.statuses}>
          <span onClick={() => handleSetFilter(null)} className={statusClassesFor(null)}>All</span>
          <span onClick={() => handleSetFilter(ToDoItemStatus.ACTIVE)} className={statusClassesFor(ToDoItemStatus.ACTIVE)}>Active</span>
          <span onClick={() => handleSetFilter(ToDoItemStatus.DONE)} className={statusClassesFor(ToDoItemStatus.DONE)}>Done</span>
        </div>
      </div>
      {
        (filteredItems.length === 0
          ? <h2 className={classes.emptyMessage}>Oh! Looks like there is nothing to do.</h2>
          : <ToDoItems items={filteredItems}
            toggleEdit={toggleEdit}
            handleEdit={handleEdit}
            handleClick={handleClick}
            handleDelete={handleDelete}/>)
      }
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
