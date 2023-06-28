import { v4 } from "uuid";
import { TodoItem } from "./src/typings/typings";
import { UserData, database } from "./src/firebase";
import { updateDoc } from "firebase/firestore";

export const initialData: UserData = {
  firstName: '',
  lastName: '',
  todos: [],
  sections: ['default'],
  config: {
    showCompleted: false
  }
}

export function isWhitespace(char: string) {
  return char == ' ' || char == '\n' || char == '\r';
}

export function addTodo(todos: TodoItem[], content: string, section: string): TodoItem[] {
  if (content.split('').some((char) => !isWhitespace(char))) {
    return [
      ...todos,
      {
        id: v4(),
        content,
        done: false,
        section: section,
      },
    ];
  }
  return todos;
}

export function deleteTodo(todos: TodoItem[], id: string): TodoItem[] {
  return todos.filter((todo) => todo.id !== id);
}

export function toggleTodo(todos: TodoItem[], id: string): TodoItem[] {
  const newTodos = [...todos];
  const todo = newTodos.find((todo) => todo.id === id);
  if (todo) {
    todo.done = !todo.done;
    return newTodos;
  }
  return todos;
}

export function swapTodos(todos: TodoItem[], id: string, otherId: string): TodoItem[] {
  const newTodos = [...todos];
  const todo = newTodos.find((todo) => todo.id === id);
  const beforeTodo = newTodos.find((todo) => todo.id === otherId);

  if (todo && beforeTodo) {
    if (todo.section !== beforeTodo.section) {
      todo.section = beforeTodo.section;
    }

    const index = newTodos.indexOf(todo);
    const beforeIndex = newTodos.indexOf(beforeTodo);

    newTodos.splice(index, 1);
    newTodos.splice(beforeIndex, 0, todo);

    return newTodos;
  }
  return todos;
}

export function updateTodoSection(todos: TodoItem[], id: string, newSection: string): TodoItem[] {
  const newTodos = [...todos];
  const todo = newTodos.find((todo) => todo.id === id);

  if (todo) {
    todo.section = newSection;
    return newTodos;
  }
  return todos;
}

export function addSection(sections: string[], section: string): string[] {
  if (section.split("").some((char) => !isWhitespace(char))) {
    return[...sections, section];
  }
  return sections;
}

export async function getUserData(userId: string) {
  const currentUser = await database.users.doc(userId).get();

  if (currentUser.exists) {
    return currentUser.data();
  }
  else {
    return null;
  }
}

export async function setUserData(userId: string, data: UserData) {
  const document = database.users.doc(userId);
  await updateDoc(document, data);
}

