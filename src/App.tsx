import React, { useState } from 'react';
import classes from './App.module.css';
import AdditionBar from './components/AdditionBar';
import FilterBar from './components/FilterBar';
import ToDoItems from './components/ToDoItems';
import useToDoItems from './hooks/useToDoItems';
import { ReactComponent as CheckedSVG } from './assets/Checkbox__checked.svg';
import { ReactComponent as UncheckedSVG } from './assets/Checkbox__unchecked.svg';
import Checkbox from './components/Checkbox';

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
      <div>
        <p className={classes.server}><Checkbox checked={!usingServer} onClick={() => setUsingServer(false)}/> <span>Use Local Data</span></p>
        <p className={classes.server}>
          <Checkbox checked={usingServer} onClick={() => setUsingServer(true)}/>
          <span>Use Server</span>
          <input type="text" placeholder="host" value={host} onChange={(e) => setHost(e.target.value)} />
          <input type="text" placeholder="PORT" value={port} onChange={(e) => setPort(Number(e.target.value))} />
          <button onClick={updateServerUrl}>Save</button>
        </p>
        {usingServer && <span>Using Server: {serverUrl }</span>}
      </div>
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
