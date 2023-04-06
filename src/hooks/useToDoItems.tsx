import { useEffect, useState } from 'react';
import {
  createToDoItemApi,
  deleteToDoItemApi,
  getToDoItemsApi,
  updateToDoItemApi
} from '../api/ToDoApi';
import { DummyToDoItems } from '../constants';
import { IToDoItemState, ToDoItemStatus } from '../types';

const useToDoItems = (usingServer: boolean, serverUrl: string) => {
  const [newTitle, setNewTitle] = useState<string>('');
  const [items, setItems] = useState<IToDoItemState[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<ToDoItemStatus | null>(null);

  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    initialize();
  }, [usingServer, serverUrl]);

  // Handles request loading and set error if any
  const handleRequest = async (task: () => Promise<void>) => {
    try {
      setLoading(true);
      await new Promise((resolve) => {
        setTimeout(resolve, 800);
      }); // better experience when load for awhile
      await task();
      setError(null);
    } catch (error) {
      console.log('Error!');
      console.error(error);
      setError(error as Error);
    }
    setLoading(false);
  };

  const initialize = async () => {
    setError(null);
    if (!usingServer) {
      setItems(DummyToDoItems);
    } else {
      // Use ToDoItems Data from chosen Endpoint
      // GET /to_do_items
      handleRequest(async () => {
        const response = await getToDoItemsApi(serverUrl);
        setItems(response.data as IToDoItemState[]);
      });
    }
  };

  // Set state wrappers
  const setItemsWithNewEditState = (id: number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          item.editing = !item.editing;
        }
        return item;
      })
    );
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
    setItems([...items, newItem]);
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

    const newItem = {
      id: items.length + 1,
      title: newTitle,
      status: ToDoItemStatus.ACTIVE,
    };

    if (!usingServer) {
      setItemsWithNewItem(newItem);
      return;
    }

    // POST /to_do_items
    handleRequest(async () => {
      const response = await createToDoItemApi(serverUrl, newItem);
      const responseItem = response.data as IToDoItemState;

      setItemsWithNewItem({ ...newItem, id: responseItem.id }); // Sync id from backend
    });
  };

  const toggleEdit = async (id: number) => {
    if (!usingServer) {
      setItemsWithNewEditState(id);
      return;
    }

    // Save Item's new title
    // PATCH /to_do_items/:id
    handleRequest(async () => {
      const targetItem = items.find((item) => item.id === id) as IToDoItemState;
      const clonedItem = { ...targetItem };
      if (clonedItem.editing) {
        delete clonedItem.editing;
        await updateToDoItemApi(serverUrl, clonedItem);
      }
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
    if (!usingServer) {
      setItemsWithToggledStatus(id);
      return;
    }

    // PATCH /to_do_items/:id
    handleRequest(async () => {
      const targetItem = {
        ...(items.find((item) => item.id === id) as IToDoItemState),
      };
      let clonedItem = { ...targetItem };
      delete clonedItem.editing;
      clonedItem = toggleItemStatus(clonedItem);
      await updateToDoItemApi(serverUrl, clonedItem);
      setItemsWithToggledStatus(id);
    });
  };

  const handleDelete = async (id: number) => {
    if (!usingServer) {
      setItems(items.filter((item) => item.id !== id));
      return;
    }

    // DELETE /to_do_items/:id
    handleRequest(async () => {
      const targetItem = items.find((item) => item.id === id) as IToDoItemState;
      await deleteToDoItemApi(serverUrl, targetItem);
      setItems(items.filter((item) => item.id !== id));
    });
  };

  const handleSetFilter = (status: ToDoItemStatus | null) => {
    setFilterStatus(status);
  };

  let filteredItems: IToDoItemState[] = items;
  filteredItems = filterStatus
    ? items.filter((item) => item.status === filterStatus)
    : items;
  filteredItems = searchTerm
    ? items.filter((item) => item.title.match(new RegExp(searchTerm, 'gi')))
    : filteredItems;

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
    error,
  };
};

export default useToDoItems;
