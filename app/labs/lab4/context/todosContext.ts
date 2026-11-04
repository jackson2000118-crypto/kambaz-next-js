import {
  createContext,
  createElement,
  useContext,
  useState,
  type ReactNode,
} from "react";

type Todo = {
  id: string;
  title: string;
};

type TodosContextValue = {
  todos: Todo[];
  addTodo: (title: string) => void;
  updateTodo: (id: string, title: string) => void;
  deleteTodo: (id: string) => void;
};

const TodosContext = createContext<TodosContextValue | null>(null);

export function TodosProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string) => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
    };
    setTodos([...todos, newTodo]);

  };

  const updateTodo = (id: string, title: string) => {
    const checkTodo = todos.map((todo) => todo.id === id ? {...todo, title: title} : todo);
    setTodos(checkTodo);
  };

  const deleteTodo = (id: string) => {
    const checkTodo = todos.filter((todo) => todo.id !== id);
    setTodos(checkTodo);
  };

  return createElement(
    TodosContext.Provider,
    { value: { todos, addTodo, updateTodo, deleteTodo } },
    children
  );
}

export function useTodosContext() {
  const value = useContext(TodosContext);

  if (!value) {
    throw new Error(
      "useTodosContext must be used inside TodosProvider"
    );
  }

  return value;
}