"use client";
import { useEffect, useState } from "react";
import * as client from "./client";
import type { Assignment } from "./types";

export default function WorkingWithRemoteObjectsAsynchronously() {
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    client
      .fetchAssignment()
      .then(setAssignment)
      .catch((error) => setError(client.errorText(error)));
  }, []);
  const updateTitle = async () => {
    if (!assignment) {
      return;
    }
    try {
      setBusy(true);
      setError("");
      setAssignment(await client.updateTitle(assignment.title));
    } catch (error) {
      setError(client.errorText(error));
    } finally {
      setBusy(false);
    }
  };
  return (
    <section
      id="wd-remote-objects-async"
      className="space-y-3 rounded border p-4 gap-6 mb-4"
    >
      <h3 className="text-xl font-semibold">
        Working with Objects Asynchronously
      </h3>
      {error && (
        <p role="alert" className="rounded bg-red-100 p-3 text-red-800">
          {error}
        </p>
      )}
      {assignment ? (
        <>
          <label className="block">
            Title{" "}
            <input
              aria-label="Async assignment title"
              className="w-full rounded border px-3 py-2 gap-6 mb-4"
              value={assignment.title}
              onChange={(e) =>
                setAssignment({ ...assignment, title: e.target.value })
              }
            />
          </label>
          <label className="block">
            Description{" "}
            <textarea
              className="w-full rounded border px-3 py-2 gap-6 mb-4"
              value={assignment.description}
              onChange={(e) =>
                setAssignment({ ...assignment, description: e.target.value })
              }
            />
          </label>
          <label className="block">
            Due{" "}
            <input
              type="date"
              className="rounded border px-3 py-2 gap-6 mb-4"
              value={assignment.due}
              onChange={(e) =>
                setAssignment({ ...assignment, due: e.target.value })
              }
            />
          </label>
          <label className="block">
            <input
              type="checkbox"
              checked={assignment.completed}
              onChange={(e) =>
                setAssignment({ ...assignment, completed: e.target.checked })
              }
            />{" "}
            Completed
          </label>
          <button
            type="button"
            onClick={updateTitle}
            disabled={busy || !assignment.title.trim()}
            className="rounded bg-blue-600 px-3 py-2 text-white disabled:opacity-50 gap-6 mb-4"
          >
            Update Title
          </button>
          <p className="text-sm text-slate-600 gap-6 mb-4">
            This button saves only the title. Other fields demonstrate local
            state.
          </p>
          <pre className="overflow-auto rounded bg-slate-100 p-3 text-slate-900 gap-6 mb-4">
            {JSON.stringify(assignment, null, 2)}
          </pre>
        </>
      ) : (
        !error && <p>Loading assignment…</p>
      )}
    </section>
  );
}
