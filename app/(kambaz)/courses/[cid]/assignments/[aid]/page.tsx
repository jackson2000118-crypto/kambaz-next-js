"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  useAssignmentsStore,
  type Assignment,
} from "../../../../store/assignmentsStore";

export default function AssignmentEditor() {
  const params = useParams();
  const cid = typeof params.cid === "string" ? params.cid : "";
  const aid = typeof params.aid === "string" ? params.aid : "";

  const router = useRouter();
  const isNew = aid === "new";

  const assignments = useAssignmentsStore(
    (state) => state.assignments
  );
  const addAssignment = useAssignmentsStore(
    (state) => state.addAssignment
  );
  const updateAssignment = useAssignmentsStore(
    (state) => state.updateAssignment
  );

  const existingAssignment = assignments.find(
    (a) => a._id === aid && a.course === cid
  );

  const [assignment, setAssignment] = useState<Assignment | null>(
    null
  );

  useEffect(() => {
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
      });
    } else {
      setAssignment(
        existingAssignment ? { ...existingAssignment } : null
      );
    }
  }, [cid, aid, isNew, existingAssignment]);

  const save = () => {
    if (!assignment || assignment.course !== cid) return;

    if (isNew) {
      addAssignment(assignment);
    } else {
      if (!existingAssignment) return;
      updateAssignment({
        ...assignment,
        _id: aid,
        course: cid,
      });
    }

    router.push(`/courses/${cid}/assignments`);
  };

  if (!isNew && !existingAssignment) {
    return (
      <div>
        <p>Assignment not found in this course.</p>
        <Link href={`/courses/${cid}/assignments`}>
          Back to Assignments
        </Link>
      </div>
    );
  }

  if (!assignment) return null;

  return (
    <div id="wd-assignments-editor" className="max-w-3xl">
      <div className="mb-4">
        <label
          htmlFor="wd-name"
          className="mb-2 block font-medium"
        >
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
        <p className="mt-2 text-sm text-neutral-600">
          Assignment id: {aid}
        </p>
      </div>

      <div className="mb-4">
        <label
          htmlFor="wd-description"
          className="mb-2 block font-medium"
        >
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
        <label
          htmlFor="wd-points"
          className="mb-2 block font-medium"
        >
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
              points: Number(e.target.value),
            })
          }
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="wd-group"
          className="mb-2 block font-medium"
        >
          Assignment Group
        </label>

        <select
          id="wd-group"
          defaultValue="ASSIGNMENTS"
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
          defaultValue="Percentage"
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
          defaultValue="Online"
          className="w-full rounded border border-neutral-300 bg-white p-2"
        >
          <option value="Online">Online</option>
          <option value="InPerson">In Person</option>
        </select>
      </div>

      <fieldset className="m-0 mb-4 min-w-0 border-0 p-0">
        <legend className="mb-2 font-medium">
          Online Entry Options
        </legend>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <input id="wd-text-entry" type="checkbox" />
            <label htmlFor="wd-text-entry">Text Entry</label>
          </div>

          <div className="flex items-center gap-2">
            <input id="wd-website-url" type="checkbox" />
            <label htmlFor="wd-website-url">Website URL</label>
          </div>

          <div className="flex items-center gap-2">
            <input id="wd-media-recordings" type="checkbox" />
            <label htmlFor="wd-media-recordings">
              Media Recordings
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input id="wd-student-annotation" type="checkbox" />
            <label htmlFor="wd-student-annotation">
              Student Annotation
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input id="wd-file-upload" type="checkbox" />
            <label htmlFor="wd-file-upload">File Uploads</label>
          </div>
        </div>
      </fieldset>

      <div className="mb-4">
        <label
          htmlFor="wd-assign-to"
          className="mb-2 block font-medium"
        >
          Assign to
        </label>

        <input
          id="wd-assign-to"
          type="text"
          defaultValue="Everyone"
          className="w-full rounded border border-neutral-300 p-2"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="wd-due-date"
          className="mb-2 block font-medium"
        >
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
        <label
          htmlFor="wd-available-from"
          className="mb-2 block font-medium"
        >
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
              availableUntil: e.target.value,
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
          rows={3}
          className="w-full rounded border border-neutral-300 p-2"
        />
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Link
          href={`/courses/${cid}/assignments`}
          id="wd-cancel"
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
          Save
        </button>
      </div>
    </div>
  );
}