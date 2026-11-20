"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaPlus, FaSearch } from "react-icons/fa";
import AssignmentItem from "./AssignmentItem";
import * as client from "../../client";
import { useAssignmentsStore } from "../../../store/assignmentsStore";

export default function Assignments() {
  const params = useParams();
  const cid = typeof params.cid === "string" ? params.cid : "";

  return <AssignmentsList key={cid} cid={cid} />;
}

function AssignmentsList({ cid }: { cid: string }) {
  const router = useRouter();
  const assignments = useAssignmentsStore((state) => state.assignments);
  const setAssignments = useAssignmentsStore((state) => state.setAssignments);
  const deleteAssignment = useAssignmentsStore(
    (state) => state.deleteAssignment
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const active = useRef(false);
  const pending = useRef(false);

  useEffect(() => {
    let cancelled = false;
    active.current = true;

    const load = async () => {
      setAssignments([]);
      setError("");

      try {
        const fetched = await client.findAssignmentsForCourse(cid);

        if (!cancelled) {
          setAssignments(fetched);
        }
      } catch {
        if (!cancelled) {
          setError("Unable to load assignments. Please refresh and try again.");
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
  }, [cid, setAssignments]);

  const onDeleteAssignment = async (assignmentId: string) => {
    if (pending.current || !active.current) {
      return;
    }

    pending.current = true;
    setSaving(true);
    setError("");

    try {
      await client.deleteAssignment(assignmentId);

      if (active.current) {
        deleteAssignment(assignmentId);
      }
    } catch {
      if (active.current) {
        setError("Unable to delete assignment. Please try again.");
      }
    } finally {
      pending.current = false;

      if (active.current) {
        setSaving(false);
      }
    }
  };

  return (
    <div id="wd-assignments">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="relative">
          <FaSearch className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500" />

          <input
            id="wd-search-assignment"
            type="text"
            placeholder="Search for Assignments"
            className="rounded border border-neutral-300 py-1.5 pr-3 pl-9 text-sm"
          />
        </div>

        <div className="flex gap-2">
          <button
            id="wd-add-assignment-group"
            type="button"
            className="inline-flex items-center gap-1 rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm"
          >
            <FaPlus />
            Group
          </button>

          <button
            id="wd-add-assignment"
            onClick={() => router.push(`/courses/${cid}/assignments/new`)}
            type="button"
            className="inline-flex items-center gap-1 rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white"
          >
            <FaPlus />
            Assignment
          </button>
        </div>
      </div>

      <h3
        id="wd-assignments-title"
        className="mb-3 flex items-center justify-between rounded bg-neutral-200 p-3 text-lg"
      >
        <span>ASSIGNMENTS 40% of Total</span>

        <button
          type="button"
          aria-label="Add assignment to group"
          onClick={() => router.push(`/courses/${cid}/assignments/new`)}
          className="rounded border border-neutral-300 bg-white px-2 py-0.5 text-sm"
        >
          <FaPlus />
        </button>
      </h3>

      {loading && <p role="status">Loading assignments...</p>}

      {saving && <p role="status">Deleting assignment...</p>}

      {error && (
        <p role="alert" className="text-red-600">
          {error}
        </p>
      )}

      {!loading && !error && assignments.length === 0 && (
        <p>No assignments yet. Use + Assignment to create one.</p>
      )}

      <ul id="wd-assignment-list" className="m-0 list-none p-0">
        {!loading &&
          assignments.map((assignment) => (
            <AssignmentItem
              key={assignment._id}
              cid={cid}
              aid={assignment._id}
              title={assignment.title}
              disabled={saving || loading}
              onDelete={() => onDeleteAssignment(assignment._id)}
              details={`Multiple Modules | Not available until ${assignment.available} | Due ${assignment.due} | ${assignment.points} pts`}
            />
          ))}
      </ul>
    </div>
  );
}
