import React, { useState } from 'react';
import classes from './App.module.css';
import AdditionBar from './components/AdditionBar';
import FilterBar from './components/FilterBar';
import ToDoItems from './components/ToDoItems';
import useToDoItems from './hooks/useToDoItems';
import ServerSelect from './components/ServerSelect';

function App () {
  const [usingServer, setUsingServer] = useState(false);
  const [host, setHost] = useState<string>('http://localhost');
  const [port, setPort] = useState<number>(3000);
  const getServerUrl = () => `${host}:${port}`;
  const [serverUrl, setServerUrl] = useState(getServerUrl());
  const updateServerUrl = () => {
    setServerUrl(getServerUrl());
  };
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
    loading,
  } = useToDoItems(usingServer, serverUrl);

  return (
    <div className={classes.container}>
      {error && <p className={classes.errorMessage}> {error.message}</p>}
      <ServerSelect
        unuseServer={() => setUsingServer(false)}
        useServer={() => setUsingServer(true)}
        onChangeHost={(e) => setHost((e.target as HTMLInputElement).value)}
        onChangePort={(e) => setPort(Number((e.target as HTMLInputElement).value))}
        onSaveUpdateServerUrl={updateServerUrl}
        serverUrl={serverUrl}
        usingServer={usingServer}
        host={host}
        port={port}
      />
      <FilterBar
        filterStatus={filterStatus}
        searchTerm={searchTerm}
        onSearch={(event) => {
          setSearchTerm((event.target as HTMLInputElement).value);
        }}
        onFilter={handleSetFilter}
      />
      <ToDoItems
        items={filteredItems}
        loading={loading}
        toggleEdit={toggleEdit}
        handleEdit={handleEdit}
        handleClick={handleClick}
        handleDelete={handleDelete}
      />
      <AdditionBar
        newTitle={newTitle}
        onChange={({ target }) => setNewTitle(target.value)}
        onEnterKey={addTodo}
        onClick={addTodo}
      />
    </div>
  );
}

export default App;
