import React from 'react';
import classes from './App.module.css';
import AdditionBar from './components/AdditionBar';
import BackendSelect from './components/BackendSelect';
import FilterBar from './components/FilterBar';
import ToDoItems from './components/ToDoItems';
import { useEndpoints } from './hooks/useEndpoints';
import useToDoItems from './hooks/useToDoItems';

function App () {
  const { endpoint, availableEndpoints, onChange } = useEndpoints();
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
    error,
    loading
  } = useToDoItems(endpoint);

  return (
    <div className={classes.container}>
      {error && <p className={classes.errorMessage}> {error.message}</p>}
      <BackendSelect endpoint={endpoint} availableEndpoints={availableEndpoints} onChange={onChange}/>
      <FilterBar
        filterStatus={filterStatus}
        searchTerm={searchTerm}
        onSearch={(event) => { setSearchTerm((event.target as HTMLInputElement).value); }}
        onFilter={handleSetFilter}
      />
      <ToDoItems items={filteredItems}
        loading={loading}
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
