enum ToDoItemStatus {
  ACTIVE, DONE
}

interface ToDoItem {
  id: number,
  title: string,
  status: ToDoItemStatus
}

export {ToDoItemStatus, type ToDoItem}