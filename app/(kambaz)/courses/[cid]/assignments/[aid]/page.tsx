"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import * as client from "../../../client";
import {
  useAssignmentsStore,
  type Assignment
} from "../../../../store/assignmentsStore";

export default function AssignmentEditor() {
  const params = useParams();
  const cid = typeof params.cid === "string" ? params.cid : "";
  const aid = typeof params.aid === "string" ? params.aid : "";

  return <Editor key={`${cid}/${aid}`} cid={cid} aid={aid} />;
}

function Editor({ cid, aid }: { cid: string; aid: string }) {
  const router = useRouter();
  const isNew = aid === "new";
  const addAssignment = useAssignmentsStore((state) => state.addAssignment);
  const updateAssignment = useAssignmentsStore(
    (state) => state.updateAssignment
  );
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const active = useRef(false);
  const pending = useRef(false);

  useEffect(() => {
    let cancelled = false;
    active.current = true;

    const load = async () => {
      if (isNew) {
        setAssignment({
          _id: "new",
          title: "",
          course: cid,
          description: "",
          points: 100,
          due: "",
          available: "",
          availableUntil: "",
          group: "ASSIGNMENTS",
          displayGradeAs: "Percentage",
          submissionType: "Online",
          onlineEntryOptions: [],
          assignTo: "Everyone",
          notes: ""
        });
        setLoading(false);
        return;
      }

      try {
        const fetched = await client.findAssignmentById(aid);

        if (cancelled) {
          return;
        }

        if (fetched.course !== cid) {
          setError("Assignment not found in this course.");
          return;
        }

        setAssignment(fetched);
      } catch (error) {
        if (!cancelled) {
          setError(
            axios.isAxiosError(error) && error.response?.status === 404
              ? "Assignment not found in this course."
              : "Unable to load assignment. Please refresh and try again."
          );
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
  }, [cid, aid, isNew]);

  const toggleOption = (option: string, checked: boolean) => {
    setAssignment((current) => {
      if (!current) {
        return current;
      }

      const options = current.onlineEntryOptions ?? [];

      return {
        ...current,
        onlineEntryOptions: checked
          ? [...new Set([...options, option])]
          : options.filter((value) => value !== option)
      };
    });
  };

  const save = async () => {
    if (!assignment || assignment.course !== cid || pending.current) {
      return;
    }

    if (assignment.title.trim() === "") {
      setError("Assignment name is required.");
      return;
    }

    if (!Number.isFinite(assignment.points) || assignment.points < 0) {
      setError("Points must be a non-negative number.");
      return;
    }

    pending.current = true;
    setSaving(true);
    setError("");

    try {
      const saved = isNew
        ? await client.createAssignmentForCourse(cid, assignment)
        : await client.updateAssignment({ ...assignment, _id: aid });

      if (!active.current) {
        return;
      }

      if (isNew) {
        addAssignment(saved);
      } else {
        updateAssignment(saved);
      }

      router.push(`/courses/${cid}/assignments`);
    } catch {
      if (active.current) {
        setError(
          "Unable to save assignment. Your changes are still here; please try again."
        );
        pending.current = false;
        setSaving(false);
      }
    }
  };

  if (loading) {
    return <p role="status">Loading assignment...</p>;
  }

  if (!assignment) {
    return (
      <div>
        <p role="alert">{error || "Assignment not found in this course."}</p>
        <Link href={`/courses/${cid}/assignments`}>Back to Assignments</Link>
      </div>
    );
  }

  return (
    <div id="wd-assignments-editor" className="max-w-3xl">
      {error && (
        <p role="alert" className="mb-3 text-red-600">
          {error}
        </p>
      )}

      <fieldset disabled={saving} className="m-0 min-w-0 border-0 p-0">
        <div className="mb-4">
          <label htmlFor="wd-name" className="mb-2 block font-medium">
            Assignment Name
          </label>

          <input
            id="wd-name"
            type="text"
            className="w-full rounded border border-neutral-300 p-2"
            value={assignment.title}
            onChange={(e) =>
              setAssignment({ ...assignment, title: e.target.value })
            }
          />

          {/* With AI */}
          <p className="mt-2 text-sm text-neutral-600">Assignment id: {aid}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="wd-description" className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            id="wd-description"
            className="w-full rounded border border-neutral-300 p-2"
            rows={5}
            value={assignment.description}
            onChange={(e) =>
              setAssignment({ ...assignment, description: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label htmlFor="wd-points" className="mb-2 block font-medium">
            Points
          </label>

          <input
            id="wd-points"
            type="number"
            className="w-full rounded border border-neutral-300 p-2"
            value={assignment.points}
            onChange={(e) =>
              setAssignment({
                ...assignment,
                points: Number(e.target.value)
              })
            }
          />
        </div>

        <div className="mb-4">
          <label htmlFor="wd-group" className="mb-2 block font-medium">
            Assignment Group
          </label>

          <select
            id="wd-group"
            value={assignment.group ?? "ASSIGNMENTS"}
            onChange={(e) =>
              setAssignment({ ...assignment, group: e.target.value })
            }
            className="w-full rounded border border-neutral-300 bg-white p-2"
          >
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="wd-display-grade-as"
            className="mb-2 block font-medium"
          >
            Display Grade as
          </label>

          <select
            id="wd-display-grade-as"
            value={assignment.displayGradeAs ?? "Percentage"}
            onChange={(e) =>
              setAssignment({ ...assignment, displayGradeAs: e.target.value })
            }
            className="w-full rounded border border-neutral-300 bg-white p-2"
          >
            <option value="Percentage">Percentage</option>
            <option value="Points">Points</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="wd-submission-type"
            className="mb-2 block font-medium"
          >
            Submission Type
          </label>

          <select
            id="wd-submission-type"
            value={assignment.submissionType ?? "Online"}
            onChange={(e) =>
              setAssignment({ ...assignment, submissionType: e.target.value })
            }
            className="w-full rounded border border-neutral-300 bg-white p-2"
          >
            <option value="Online">Online</option>
            <option value="InPerson">In Person</option>
          </select>
        </div>

        <fieldset className="m-0 mb-4 min-w-0 border-0 p-0">
          <legend className="mb-2 font-medium">Online Entry Options</legend>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input
                id="wd-text-entry"
                type="checkbox"
                checked={
                  assignment.onlineEntryOptions?.includes("text-entry") ?? false
                }
                onChange={(e) => toggleOption("text-entry", e.target.checked)}
              />
              <label htmlFor="wd-text-entry">Text Entry</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="wd-website-url"
                type="checkbox"
                checked={
                  assignment.onlineEntryOptions?.includes("website-url") ??
                  false
                }
                onChange={(e) => toggleOption("website-url", e.target.checked)}
              />
              <label htmlFor="wd-website-url">Website URL</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="wd-media-recordings"
                type="checkbox"
                checked={
                  assignment.onlineEntryOptions?.includes("media-recordings") ??
                  false
                }
                onChange={(e) =>
                  toggleOption("media-recordings", e.target.checked)
                }
              />
              <label htmlFor="wd-media-recordings">Media Recordings</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="wd-student-annotation"
                type="checkbox"
                checked={
                  assignment.onlineEntryOptions?.includes(
                    "student-annotation"
                  ) ?? false
                }
                onChange={(e) =>
                  toggleOption("student-annotation", e.target.checked)
                }
              />
              <label htmlFor="wd-student-annotation">Student Annotation</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="wd-file-upload"
                type="checkbox"
                checked={
                  assignment.onlineEntryOptions?.includes("file-upload") ??
                  false
                }
                onChange={(e) => toggleOption("file-upload", e.target.checked)}
              />
              <label htmlFor="wd-file-upload">File Uploads</label>
            </div>
          </div>
        </fieldset>

        <div className="mb-4">
          <label htmlFor="wd-assign-to" className="mb-2 block font-medium">
            Assign to
          </label>

          <input
            id="wd-assign-to"
            type="text"
            value={assignment.assignTo ?? "Everyone"}
            onChange={(e) =>
              setAssignment({ ...assignment, assignTo: e.target.value })
            }
            className="w-full rounded border border-neutral-300 p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="wd-due-date" className="mb-2 block font-medium">
            Due
          </label>

          <input
            id="wd-due-date"
            type="date"
            className="w-full rounded border border-neutral-300 p-2"
            value={assignment.due}
            onChange={(e) =>
              setAssignment({ ...assignment, due: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label htmlFor="wd-available-from" className="mb-2 block font-medium">
            Available from
          </label>

          <input
            id="wd-available-from"
            type="date"
            className="w-full rounded border border-neutral-300 p-2"
            value={assignment.available}
            onChange={(e) =>
              setAssignment({ ...assignment, available: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="wd-available-until"
            className="mb-2 block font-medium"
          >
            Until
          </label>

          <input
            id="wd-available-until"
            type="date"
            className="w-full rounded border border-neutral-300 p-2"
            value={assignment.availableUntil ?? ""}
            onChange={(e) =>
              setAssignment({
                ...assignment,
                availableUntil: e.target.value
              })
            }
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="wd-ai-editor-notes"
            className="mb-2 block font-medium"
          >
            Sample notes
          </label>

          <textarea
            id="wd-ai-editor-notes"
            value={assignment.notes ?? ""}
            onChange={(e) =>
              setAssignment({ ...assignment, notes: e.target.value })
            }
            rows={3}
            className="w-full rounded border border-neutral-300 p-2"
          />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Link
            href={`/courses/${cid}/assignments`}
            id="wd-cancel"
            onClick={(event) => {
              if (saving) {
                event.preventDefault();
              }
            }}
            className="rounded border border-neutral-300 bg-white px-4 py-2 text-neutral-900 no-underline"
          >
            Cancel
          </Link>

          <button
            type="button"
            id="wd-save"
            onClick={save}
            className="rounded bg-red-600 px-4 py-2 text-white"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </fieldset>
    </div>
  );
}
