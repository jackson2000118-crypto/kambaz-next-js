import { useState } from "react";
import { useTodosContext } from "./todosContext";

export default function ReactContextTodoList() {
  const { todos, addTodo, updateTodo, deleteTodo } = useTodosContext();
  const [title, setTitle] = useState("");

  return (
    <div id="wd-react-context-todo-list">
      <h3>Context Todo List</h3>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New todo"
        className="mb-2 rounded border border-neutral-300 px-3 py-1.5"
      />

      <button
        type="button"
        onClick={() => {
            addTodo(title);
            setTitle("");
        }}
        className="rounded bg-green-600 px-3 py-1.5 text-white">
            Add
        </button>
        

      <ul className="m-0 list-none p-0">
        {todos.map((todo) => (
          <li key={todo.id} className="mb-2 flex items-center gap-2">
            {/* On your own：新增文字 input。
                value 使用 todo.title，
                onChange 呼叫 updateTodo，傳入 todo.id 與新文字。 */}
            <input
                type="text"
                value={todo.title}
                onChange={(c) => updateTodo(todo.id, c.target.value)} 
            />

            {/* On your own：新增 Delete 按鈕。
                點擊時呼叫 deleteTodo，傳入 todo.id。 */}
            <button
                type="button"
                onClick={() => deleteTodo(todo.id)}>
                    
            Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}