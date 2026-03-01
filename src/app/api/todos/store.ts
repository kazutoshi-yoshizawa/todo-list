import { Todo } from "@/types/todo";

let nextId = 1;
const todos: Todo[] = [];

export function getAll(): Todo[] {
  return [...todos].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function create(title: string): Todo {
  const todo: Todo = {
    id: nextId++,
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  todos.push(todo);
  return todo;
}

export function update(id: number, data: Partial<Todo>): Todo | null {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return null;
  if (data.title !== undefined) todo.title = data.title;
  if (data.completed !== undefined) todo.completed = data.completed;
  return { ...todo };
}

export function remove(id: number): boolean {
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return false;
  todos.splice(index, 1);
  return true;
}
