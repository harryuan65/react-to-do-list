import { useEffect, useState } from 'react';
import { createToDoItemApi, deleteToDoItemApi, getToDoItemsApi, updateToDoItemApi } from '../api/ToDoApi';
import { DummyToDoItems } from '../constants';
import { IToDoItemState, ToDoItemStatus } from '../types';
import { Endpoint } from './useEndpoints';

const useToDoItems = (endpoint: Endpoint) => {
  const [newTitle, setNewTitle] = useState<string>('');
  const [items, setItems] = useState<IToDoItemState[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<ToDoItemStatus| null>(null);
  const [useEndpoint, setUseEndpoint] = useState<boolean>(false);
  const [error, setError] = useState<Error|null>(null);

  useEffect(() => {
    initialize();
  }, [endpoint]);

  const initialize = async () => {
    if (endpoint.name === 'Local dummy data') {
      setItems(DummyToDoItems);
    } else {
      const { url } = endpoint;
      setUseEndpoint(true);
      try {
        const response = await getToDoItemsApi(url);
        setItems(response.data as IToDoItemState[]);
        clearError();
      } catch (error) {
        setError(error as Error);
      }
    }
  };
  const clearError = () => setError(null);
  // Set state wrappers
  const setItemsWithNewEditState = (id: number) => {
    setItems(items.map((item) => {
      if (item.id === id) {
        item.editing = !item.editing;
      }
      return item;
    }));
  };

  const setItemsWithToggledStatus = (id: number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          item = toggleItemStatus(item);
        }
        return item;
      })
    );
  };

  const toggleItemStatus = (item: IToDoItemState) => {
    if (item.status === ToDoItemStatus.ACTIVE) {
      item.status = ToDoItemStatus.DONE;
    } else {
      item.status = ToDoItemStatus.ACTIVE;
    }
    return item;
  };

  // Endpoint Actions

  // Local Handlers
  const addTodo = async () => {
    // Prevent creating empty to-dos
    if (!newTitle) return;
    const newItem = { id: items.length + 1, title: newTitle, status: ToDoItemStatus.ACTIVE };

    if (!useEndpoint) {
      setItems([
        ...items,
        newItem,
      ]);
      setNewTitle('');
    }

    try {
      const response = await createToDoItemApi(endpoint.url, newItem);
      const responseItem = response.data as IToDoItemState;
      newItem.id = responseItem.id;
      clearError();
    } catch (error) {
      setError(error as Error);
      return;
    }
    setItems([
      ...items,
      newItem,
    ]);
    setNewTitle('');
  };

  const toggleEdit = async (id: number) => {
    if (!useEndpoint) {
      setItemsWithNewEditState(id);
      return;
    }

    // Save Item's new title
    const targetItem = items.find(item => item.id === id) as IToDoItemState;
    try {
      await updateToDoItemApi(endpoint.url, targetItem);
      setItemsWithNewEditState(id);
      clearError();
    } catch (error) {
      setError(error as Error);
    }
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

  const handleClick = async (id: number) => {
    if (!useEndpoint) {
      setItemsWithToggledStatus(id);
      return;
    }

    let targetItem = { ...items.find(item => item.id === id) as IToDoItemState };
    targetItem = toggleItemStatus(targetItem);
    try {
      await updateToDoItemApi(endpoint.url, targetItem);
      setItemsWithToggledStatus(id);
      clearError();
    } catch (error) {
      setError(error as Error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!useEndpoint) {
      setItems(items.filter((item) => item.id !== id));
      return;
    }

    const targetItem = items.find(item => item.id === id) as IToDoItemState;
    try {
      await deleteToDoItemApi(endpoint.url, targetItem);
      setItems(items.filter((item) => item.id !== id));
      clearError();
    } catch (error) {
      setError(error as Error);
    }
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
    error
  };
};

export default useToDoItems;
