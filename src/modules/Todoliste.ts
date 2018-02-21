export interface TodoList {
  id?: string,
  uuid : string,
  name : string,
  items : Set<TodoItem>
}

export interface TodoItem {
  id?: string,
  uuid? : string,
  name : string,
  desc? : string,
  complete : boolean
}
