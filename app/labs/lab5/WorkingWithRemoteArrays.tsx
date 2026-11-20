"use client";
import { useState } from "react";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const API = `${HTTP_SERVER}/lab5/todos`;
export default function WorkingWithRemoteArrays() {
  const [todo, setTodo] = useState({
    id: "1",
    title: "NodeJS Assignment",
    completed: false,
    description: "Create a NodeJS server with ExpressJS",
  });
  const links = [
    ["wd-retrieve-todos", API, "Get Todos"],
    [
      "wd-retrieve-todo-by-id",
      `${API}/${encodeURIComponent(todo.id)}`,
      "Get Todo by ID",
    ],
    [
      "wd-retrieve-completed-todos",
      `${API}?completed=true`,
      "Get Completed Todos",
    ],
    ["wd-create-todo", `${API}/create`, "Create Todo (GET)"],
    [
      "wd-remove-todo",
      `${API}/${encodeURIComponent(todo.id)}/delete`,
      `Remove Todo with ID = ${todo.id}`,
    ],
    [
      "wd-update-todo-title",
      `${API}/${encodeURIComponent(todo.id)}/title/${encodeURIComponent(todo.title)}`,
      "Update Todo Title",
    ],
    // §5.2.4.7 On your own
    [
      "wd-update-todo-completed",
      `${API}/${encodeURIComponent(todo.id)}/completed/${todo.completed}`,
      `Complete Todo ID = ${todo.id}`,
    ],
    [
      "wd-update-todo-description",
      `${API}/${encodeURIComponent(todo.id)}/description/${encodeURIComponent(todo.description)}`,
      `Describe Todo ID = ${todo.id}`,
    ],
  ];
  return (
    <section id="wd-remote-arrays" className="space-y-3 rounded border p-4">
      <h3 className="text-xl font-semibold">5.2.4 Working with Arrays</h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "24px",
          marginBottom: "16px",
        }}
      >
        <label>
          ID{" "}
          <input
            id="wd-todo-id"
            className="w-full rounded border px-3 py-2"
            value={todo.id}
            onChange={(e) => setTodo({ ...todo, id: e.target.value })}
          />
        </label>
        <label>
          Title{" "}
          <input
            id="wd-todo-title"
            className="w-full rounded border px-3 py-2"
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
        </label>
        <label>
          Description{" "}
          <input
            id="wd-todo-description"
            className="w-full rounded border px-3 py-2"
            value={todo.description}
            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          />
        </label>
        <label className="self-center">
          <input
            id="wd-todo-completed"
            type="checkbox"
            checked={todo.completed}
            onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
          />{" "}
          Completed
        </label>
      </div>
      <ul className="space-y-2">
        {links.map(([id, href, label]) => (
          <li key={id} style={{ marginBottom: "20px" }}>
            <h4 className="mb-2 font-semibold">{label}</h4>
            <a
              id={id}
              className="text-blue-700 underline"
              href={href}
              target="_blank"
              rel="noreferrer"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

