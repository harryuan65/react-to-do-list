import React, { useState } from 'react';
import './App.css';
// Local test
import { ToDoItems } from './constants';

function App() {
  const [items, setItems] = useState(ToDoItems);
  return (
    <div>
      {items.map((item, i) => (
        <div key={i}>
          <input type="checkbox" />
          <span>{item.title}</span>
        </div>
      ))}
    </div>
  );
}

export default App;
