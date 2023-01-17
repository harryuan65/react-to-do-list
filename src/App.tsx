import React, { useState } from 'react';
import classes from './App.module.css';
import FilterBar from './components/FilterBar';
import ToDoItems from './components/ToDoItems';
import { DummyToDoItems } from './constants';
import { IToDoItemState, ToDoItemStatus } from './types';

function App () {
  const [newTitle, setNewTitle] = useState<string>('');
  const [items, setItems] = useState<IToDoItemState[]>(DummyToDoItems);
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

  let filteredItems: IToDoItemState[] = items;
  filteredItems = filterStatus ? items.filter(item => item.status === filterStatus) : items;
  filteredItems = searchTerm ? items.filter(item => item.title.match(new RegExp(searchTerm, 'gi'))) : filteredItems;

  return (
    <div className={classes.container}>
      <FilterBar
        filterStatus={filterStatus}
        searchTerm={searchTerm}
        onSearch={(event) => { handleSearch((event.target as HTMLInputElement).value); }}
        onFilter={handleSetFilter}
      />
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
