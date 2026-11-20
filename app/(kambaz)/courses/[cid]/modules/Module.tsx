"use client";

import { useState } from "react";
import ModuleControlButtons from "./ModuleControlButtons";
import Lesson from "./Lesson";
import type { CourseModule } from "../../../store/modulesStore";

export default function Module({
  module,
  disabled,
  onSave,
  onDelete,
}: {
  module: CourseModule;
  disabled: boolean;
  onSave: (module: CourseModule) => Promise<boolean>;
  onDelete: () => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(module.name);
  const [error, setError] = useState("");

  const startEditing = () => {
    setName(module.name);
    setError("");
    setEditing(true);
  };

  const save = async () => {
    if (disabled) {
      return;
    }

    if (name.trim() === "") {
      setError("Module name is required.");
      return;
    }

    setError("");

    const saved = await onSave({
      ...module,
      name: name.trim(),
    });

    if (saved) {
      setEditing(false);
    }
  };

  return (
    <li className="wd-module mb-5 overflow-hidden border border-neutral-400 p-0 text-xl">
      <div
        className="wd-title flex items-center justify-between bg-neutral-200 p-3 ps-2"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        {editing ? (
          <input
            autoFocus
            aria-label="Module name"
            disabled={disabled}
            className="w-1/2 rounded border border-neutral-300 px-2 py-1 text-base"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                e.preventDefault();
                void save();
              }

              if (e.key === "Escape") {
                setEditing(false);
                setError("");
              }
            }}
          />
        ) : (
          <span>{module.name}</span>
        )}

        <ModuleControlButtons
          disabled={disabled}
          onEdit={startEditing}
          onDelete={onDelete}
        />
      </div>

      {error && (
        <p role="alert" className="px-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <ul className="wd-lessons m-0 list-none p-0">
        {module.lessons?.map((lesson) => (
          <Lesson key={lesson._id} title={lesson.name}>
            <li className="wd-content-item">
              {lesson.description}
            </li>
          </Lesson>
        ))}
      </ul>
    </li>
  );
}
