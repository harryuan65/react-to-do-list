import { IToDoItemData, ToDoItemStatus } from './types';
export const DummyToDoItems: IToDoItemData[] = [
  {
    id: 1,
    title: 'Do leetcode questions',
    status: ToDoItemStatus.ACTIVE
  },
  {
    id: 2,
    title: 'Work out',
    status: ToDoItemStatus.DONE
  },
  {
    id: 3,
    title: 'Review systems design knowledge',
    status: ToDoItemStatus.ACTIVE
  },
];
