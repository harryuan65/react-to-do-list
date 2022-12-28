enum ToDoItemStatus {
  ACTIVE, DONE
}

interface ToDoItemData {
  id: number,
  title: string,
  status: ToDoItemStatus
}

export {ToDoItemStatus, type ToDoItemData}