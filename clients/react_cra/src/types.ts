enum ToDoItemStatus {
  ACTIVE, DONE
}

// For server
interface ToDoItemData {
  id: number,
  title: string,
  status: ToDoItemStatus
}

// For client
interface ToDoItemState extends ToDoItemData {
  editing?: boolean;
}

export {ToDoItemStatus, type ToDoItemData, type ToDoItemState}