import React from 'react';
import classes from './App.module.css';
import FilterBar from './components/FilterBar';
import ToDoItems from './components/ToDoItems';
import useToDoItems from './hooks/useToDoItems';

function App () {
  const {
    addTodo,
    toggleEdit,
    handleEdit,
    handleClick,
    handleDelete,
    handleSetFilter,
    newTitle,
    setNewTitle,
    filteredItems,
    searchTerm,
    setSearchTerm,
    filterStatus,
  } = useToDoItems();

  let renderItems = null;

  if (filteredItems.length === 0) {
    renderItems = <h2 className={classes.emptyMessage}>Oh! Looks like there is nothing to do.</h2>;
  } else {
    renderItems = <ToDoItems items={filteredItems}
      toggleEdit={toggleEdit}
      handleEdit={handleEdit}
      handleClick={handleClick}
      handleDelete={handleDelete}/>;
  }

  return (
    <div className={classes.container}>
      <FilterBar
        filterStatus={filterStatus}
        searchTerm={searchTerm}
        onSearch={(event) => { setSearchTerm((event.target as HTMLInputElement).value); }}
        onFilter={handleSetFilter}
      />
      <ToDoItems items={filteredItems}
        toggleEdit={toggleEdit}
        handleEdit={handleEdit}
        handleClick={handleClick}
        handleDelete={handleDelete}/>
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
