enum ToDoItemStatus {
  ACTIVE='active', DONE='done'
}

// For server
interface IToDoItemData {
  id: number,
  title: string,
  status: ToDoItemStatus
}

// For client
interface IToDoItemState extends IToDoItemData {
  editing?: boolean;
}

export { ToDoItemStatus, type IToDoItemData, type IToDoItemState };
