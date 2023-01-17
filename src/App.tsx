import React from 'react';
import classes from './App.module.css';
import AdditionBar from './components/AdditionBar';
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
      <AdditionBar newTitle={newTitle}
        onChange={({ target }) => setNewTitle(target.value)}
        onEnterKey={addTodo}
        onClick={addTodo}/>
    </div>
  );
}

export default App;
