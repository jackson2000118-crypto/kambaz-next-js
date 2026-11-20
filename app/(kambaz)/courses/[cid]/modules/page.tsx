"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Module from "./Module";
import ModulesControls from "./ModulesControls";
import * as client from "../../client";
import {
  useModulesStore,
  type CourseModule,
} from "../../../store/modulesStore";

export default function Modules() {
  const { cid } = useParams();
  const courseId = typeof cid === "string" ? cid : "";

  // A new course gets its own request/editor lifetime.
  return <CourseModules key={courseId} courseId={courseId} />;
}

function CourseModules({ courseId }: { courseId: string }) {
  const modules = useModulesStore((state) => state.modules);
  const setModules = useModulesStore((state) => state.setModules);
  const addModule = useModulesStore((state) => state.addModule);
  const updateModule = useModulesStore((state) => state.updateModule);
  const deleteModule = useModulesStore((state) => state.deleteModule);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const active = useRef(false);
  const mutationPending = useRef(false);

  useEffect(() => {
    let cancelled = false;
    active.current = true;

    const load = async () => {
      setModules([]);
      setError("");

      if (!courseId) {
        setLoading(false);
        return;
      }

      try {
        const fetched = await client.findModulesForCourse(courseId);

        if (!cancelled) {
          setModules(fetched);
        }
      } catch {
        if (!cancelled) {
          setError("Unable to load modules. Please refresh and try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
      active.current = false;
    };
  }, [courseId, setModules]);

  const runMutation = async (
    action: () => Promise<void>
  ): Promise<boolean> => {
    if (!active.current || loading || mutationPending.current) {
      return false;
    }

    mutationPending.current = true;
    setSaving(true);
    setError("");

    try {
      await action();
      return active.current;
    } catch {
      if (active.current) {
        setError("Unable to save module changes. Please try again.");
      }

      return false;
    } finally {
      mutationPending.current = false;

      if (active.current) {
        setSaving(false);
      }
    }
  };

  const onAddModule = async (name: string) => {
    return runMutation(async () => {
      const created = await client.createModuleForCourse(courseId, {
        name,
      });

      if (active.current) {
        addModule(created);
      }
    });
  };

  const onUpdateModule = async (module: CourseModule) => {
    return runMutation(async () => {
      const saved = await client.updateModule(module);

      if (active.current) {
        updateModule(saved);
      }
    });
  };

  const onDeleteModule = async (moduleId: string) => {
    await runMutation(async () => {
      await client.deleteModule(moduleId);

      if (active.current) {
        deleteModule(moduleId);
      }
    });
  };

  const busy = loading || saving;

  return (
    <div>
      <ModulesControls
        key={courseId}
        disabled={busy || !courseId}
        onAddModule={onAddModule}
      />

      {loading && (
        <p role="status">
          Loading modules...
        </p>
      )}

      {saving && (
        <p role="status">
          Saving changes...
        </p>
      )}

      {error && (
        <p role="alert" className="text-red-600">
          {error}
        </p>
      )}

      {!loading && !error && modules.length === 0 && (
        <p>
          No modules yet. Use + Module to create one.
        </p>
      )}

      <ul id="wd-modules" className="m-0 list-none p-0">
        {!loading && modules.map((module) => (
          <Module
            key={module._id}
            module={module}
            disabled={busy}
            onSave={onUpdateModule}
            onDelete={() => onDeleteModule(module._id)}
          />
        ))}
      </ul>
    </div>
  );
}
