"use client";
import { useEffect, useState } from "react";
import { FaPlusCircle, FaTrash, FaPencilAlt } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import * as client from "./client";
import type { Todo } from "./types";

export default function WorkingWithRemoteArraysAsynchronously() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draftTitle, setDraftTitle] = useState("");
  useEffect(() => {
    client
      .fetchTodos()
      .then(setTodos)
      .catch((error) => setErrorMessage(client.errorText(error)));
  }, []);
  const reload = async () => {
    try {
      setBusy(true);
      setErrorMessage(null);
      setTodos(await client.fetchTodos());
      setEditingId(null);
    } catch (error) {
      setErrorMessage(client.errorText(error));
    } finally {
      setBusy(false);
    }
  };
  const createNewTodo = async () => {
    try {
      setBusy(true);
      setErrorMessage(null);
      setTodos(await client.createNewTodo());
    } catch (error) {
      setErrorMessage(client.errorText(error));
    } finally {
      setBusy(false);
    }
  };
  const postNewTodo = async () => {
    try {
      setBusy(true);
      setErrorMessage(null);
      const newTodo = await client.postNewTodo({
        title: "New Posted Todo",
        completed: false,
      });
      setTodos((current) => [...current, newTodo]);
    } catch (error) {
      setErrorMessage(client.errorText(error));
    } finally {
      setBusy(false);
    }
  };
  const removeTodo = async (todo: Todo) => {
    try {
      setBusy(true);
      setErrorMessage(null);
      setTodos(await client.removeTodo(todo));
    } catch (error) {
      setErrorMessage(client.errorText(error));
    } finally {
      setBusy(false);
    }
  };
  // §5.2.6.4 With AI: keep try/catch and display the error; keep POST too.
  const deleteTodo = async (todo: Todo) => {
    try {
      setBusy(true);
      setErrorMessage(null);
      await client.deleteTodo(todo);
      setTodos((current) => current.filter((t) => t.id !== todo.id));
    } catch (error) {
      setErrorMessage(client.errorText(error));
    } finally {
      setBusy(false);
    }
  };
  const updateTodo = async (todo: Todo) => {
    try {
      setBusy(true);
      setErrorMessage(null);
      await client.updateTodo(todo);
      setTodos((current) => current.map((t) => (t.id === todo.id ? todo : t)));
      setEditingId(null);
    } catch (error) {
      setErrorMessage(client.errorText(error));
    } finally {
      setBusy(false);
    }
  };
  return (
    <section
      id="wd-remote-arrays-async"
      className="space-y-4 rounded border p-4"
    >
      <h3 className="text-xl font-semibold">
        5.2.5–5.2.6 Working with Arrays Asynchronously
      </h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "24px",
          marginBottom: "16px",
        }}
      >
        <button
          id="wd-create-todo-async"
          type="button"
          disabled={busy}
          onClick={createNewTodo}
          className="flex items-center gap-2 rounded border px-3 py-2 text-green-700 disabled:opacity-50"
        >
          <FaPlusCircle /> Create (GET)
        </button>
        <button
          id="wd-post-todo"
          type="button"
          disabled={busy}
          onClick={postNewTodo}
          className="flex items-center gap-2 rounded border px-3 py-2 text-blue-700 disabled:opacity-50"
        >
          <FaPlusCircle /> Create (POST)
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={reload}
          className="rounded border px-3 py-2 disabled:opacity-50"
        >
          Reload Todos
        </button>
      </div>
      {errorMessage && (
        <p
          id="wd-todo-error-message"
          role="alert"
          className="rounded bg-red-100 px-3 py-2 text-red-800"
        >
          {errorMessage}
        </p>
      )}
      <ul className="divide-y rounded border">
        {todos.map((todo) => (
          <li
            key={todo.id}
            data-todo-id={todo.id}
            className="flex flex-wrap items-center gap-3 p-3"
          >
            <input
              type="checkbox"
              aria-label={`Complete ${todo.id}`}
              checked={todo.completed}
              disabled={busy}
              onChange={(e) =>
                updateTodo({ ...todo, completed: e.target.checked })
              }
            />
            {editingId === todo.id ? (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "24px",
                  marginBottom: "16px",
                }}
              >
                <input
                  autoFocus
                  aria-label={`Edit title ${todo.id}`}
                  className="min-w-0 flex-1 rounded border px-2 py-1"
                  value={draftTitle}
                  disabled={busy}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !busy) {
                      e.preventDefault();
                      void updateTodo({ ...todo, title: draftTitle });
                    }
                    if (e.key === "Escape") {
                      setEditingId(null);
                    }
                  }}
                />
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => updateTodo({ ...todo, title: draftTitle })}
                  className="text-blue-700 underline"
                >
                  Save
                </button>
              </div>
            ) : (
            <span
              style={{
                flex: 1,
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.title}
            </span>
            )}
            <small
              className="text-slate-500"
              style={{
                marginLeft: "20px",
                marginRight: "20px",
              }}
            >
              ID {todo.id}
            </small>
            <button
              type="button"
              aria-label={`Edit ${todo.id}`}
              disabled={busy}
              onClick={() => {
                setEditingId(todo.id);
                setDraftTitle(todo.title);
              }}
              className="p-2 text-blue-600"
            >
              <FaPencilAlt />
            </button>
            <button
              id={`wd-remove-todo-async-${todo.id}`}
              type="button"
              aria-label={`GET delete ${todo.id}`}
              disabled={busy}
              onClick={() => removeTodo(todo)}
              className="p-2 text-red-600"
            >
              <FaTrash />
            </button>
            <button
              id={`wd-delete-todo-${todo.id}`}
              type="button"
              aria-label={`HTTP DELETE ${todo.id}`}
              disabled={busy}
              onClick={() => deleteTodo(todo)}
              className="p-2 text-2xl text-red-600"
            >
              <TiDelete />
            </button>
          </li>
        ))}
      </ul>
      <p className="text-sm text-slate-600">
        Pencil: edit title, Enter: save. Trash: GET delete. X: HTTP DELETE.
      </p>
      <details className="text-sm">
        <summary className="cursor-pointer font-semibold">
          On your own: test a 404
        </summary>
        <p className="mt-2">
          Leave this list open. In another tab, visit the GET delete link for
          one ID below. Return here without reloading, then click X for that
          same ID. A red error should appear.
        </p>
        <ul className="mt-2 space-y-1">
          {todos.map((todo) => (
            <li key={todo.id}>
              <a
                className="text-blue-700 underline"
                href={`${client.HTTP_SERVER}/lab5/todos/${todo.id}/delete`}
                target="_blank"
                rel="noreferrer"
              >
                GET delete ID {todo.id} in another tab
              </a>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
