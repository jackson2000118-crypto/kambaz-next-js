import axios from "axios";
import type { Assignment, Todo, CalculatorResult } from "./types";

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const ASSIGNMENT_API = `${HTTP_SERVER}/lab5/assignment`;
const TODOS_API = `${HTTP_SERVER}/lab5/todos`;
export const fetchWelcomeMessage = async () => {
  const response = await axios.get<string>(`${HTTP_SERVER}/lab5/welcome`);
  return response.data;
};
export const fetchAssignment = async () => {
  const response = await axios.get<Assignment>(ASSIGNMENT_API);
  return response.data;
};
export const updateTitle = async (title: string) => {
  const response = await axios.get<Assignment>(
    `${ASSIGNMENT_API}/title/${encodeURIComponent(title)}`,
  );
  return response.data;
};
export const fetchTodos = async () => {
  const response = await axios.get<Todo[]>(TODOS_API);
  return response.data;
};
export const removeTodo = async (todo: Pick<Todo, "id">) => {
  const response = await axios.get<Todo[]>(`${TODOS_API}/${todo.id}/delete`);
  return response.data;
};
export const createNewTodo = async () => {
  const response = await axios.get<Todo[]>(`${TODOS_API}/create`);
  return response.data;
};
export const postNewTodo = async (todo: Omit<Todo, "id">) => {
  const response = await axios.post<Todo>(TODOS_API, todo);
  return response.data;
};
export const deleteTodo = async (todo: Pick<Todo, "id">) => {
  const response = await axios.delete(`${TODOS_API}/${todo.id}`);
  return response.data;
};
export const updateTodo = async (todo: Todo) => {
  const response = await axios.put(`${TODOS_API}/${todo.id}`, todo);
  return response.data;
};
export function errorText(error: unknown): string {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message || error.message;
  }
  return error instanceof Error ? error.message : "Something went wrong";
}
// §5.3 Style 4: same-origin calls do NOT use HTTP_SERVER.
export const fetchHello = async (): Promise<{ message: string }> => {
  const response = await fetch("/api/lab5/hello");
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
};
export const calculate = async (
  a: string,
  b: string,
  operation: string,
): Promise<CalculatorResult> => {
  const query = new URLSearchParams({ a, b, operation });
  const response = await fetch(`/api/lab5/calculator?${query}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || `HTTP ${response.status}`);
  }
  return data;
};
