import { IToDoItemData } from '../types';
import axios from 'axios';

const createToDoItemApi = async (url: string, newToDoItem: IToDoItemData) => {
  return await axios.post(`${url}/to_do_items`, { ...newToDoItem });
};

const updateToDoItemApi = async (url: string, newToDoItem: IToDoItemData) => {
  return await axios.patch(`${url}/to_do_items/${newToDoItem.id}`, { ...newToDoItem });
};

const getToDoItemsApi = async (url: string) => {
  return await axios.get(`${url}/to_do_items`);
};

const deleteToDoItemApi = async (url: string, toDoItem: IToDoItemData) => {
  return await axios.delete(`${url}/to_do_items/${toDoItem.id}`);
};

export {
  createToDoItemApi,
  updateToDoItemApi,
  getToDoItemsApi,
  deleteToDoItemApi
};
