import { useState } from 'react';
import { DummyToDoItems } from '../constants';
import { IToDoItemState, ToDoItemStatus } from '../types';

const useToDoItems = () => {
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

  let filteredItems: IToDoItemState[] = items;
  filteredItems = filterStatus ? items.filter(item => item.status === filterStatus) : items;
  filteredItems = searchTerm ? items.filter(item => item.title.match(new RegExp(searchTerm, 'gi'))) : filteredItems;

  return {
    addTodo,
    toggleEdit,
    handleEdit,
    handleClick,
    handleDelete,
    handleSetFilter,
    newTitle,
    setNewTitle,
    // items,
    // setItems,
    filteredItems,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
  };
};

export default useToDoItems;
