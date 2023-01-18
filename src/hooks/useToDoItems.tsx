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

  // States for using an endpoint
  const [useEndpoint, setUseEndpoint] = useState<boolean>(false);
  const [error, setError] = useState<Error|null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    initialize();
  }, [endpoint]);

  // Handles request loading and set error if any
  const handleRequest = async (task: () => Promise<void>) => {
    try {
      setLoading(true);
      await task();
      setError(null);
      setLoading(false);
    } catch (error) {
      console.log('Error!');
      console.error(error);
      setError(error as Error);
    }
  };

  const initialize = async () => {
    if (endpoint.name === 'Local dummy data') {
      setItems(DummyToDoItems);
    } else {
      // Use ToDoItems Data from chosen Endpoint
      // GET /to_do_items
      handleRequest(async () => {
        const { url } = endpoint;
        setUseEndpoint(true);
        const response = await getToDoItemsApi(url);
        setItems(response.data as IToDoItemState[]);
      });
    }
  };

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
  const setItemsWithNewItem = (newItem: IToDoItemState) => {
    setItems([
      ...items,
      newItem,
    ]);
    setNewTitle('');
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
      setItemsWithNewItem(newItem);
      return;
    }

    // POST /to_do_items
    handleRequest(async () => {
      const response = await createToDoItemApi(endpoint.url, newItem);
      const responseItem = response.data as IToDoItemState;

      setItemsWithNewItem({ ...newItem, id: responseItem.id }); // Sync id from backend
    });
  };

  const toggleEdit = async (id: number) => {
    if (!useEndpoint) {
      setItemsWithNewEditState(id);
      return;
    }

    // Save Item's new title
    // PATCH /to_do_items/:id
    handleRequest(async () => {
      const targetItem = items.find(item => item.id === id) as IToDoItemState;
      await updateToDoItemApi(endpoint.url, targetItem);
      setItemsWithNewEditState(id);
    });
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

    // PATCH /to_do_items/:id
    handleRequest(async () => {
      let targetItem = { ...items.find(item => item.id === id) as IToDoItemState };
      targetItem = toggleItemStatus(targetItem);
      await updateToDoItemApi(endpoint.url, targetItem);
      setItemsWithToggledStatus(id);
    });
  };

  const handleDelete = async (id: number) => {
    if (!useEndpoint) {
      setItems(items.filter((item) => item.id !== id));
      return;
    }

    // DELETE /to_do_items/:id
    handleRequest(async () => {
      const targetItem = items.find(item => item.id === id) as IToDoItemState;
      await deleteToDoItemApi(endpoint.url, targetItem);
      setItems(items.filter((item) => item.id !== id));
    });
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
    loading,
    error
  };
};

export default useToDoItems;
