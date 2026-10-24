import Link from "next/link";
import * as db from "../../../../database";

export default async function AssignmentEditor({
  params,
}: {
  params: Promise<{ cid: string; aid: string }>;
}) {
  const { cid, aid } = await params;

  // 找到目前課程中指定的作業
  const assignment = db.assignments.find(
    (a) => a._id === aid && a.course === cid,
  );

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
          defaultValue={assignment?.title ?? ""}
          className="w-full rounded border border-neutral-300 p-2"
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
          rows={5}
          defaultValue={assignment?.description ?? ""}
          className="w-full rounded border border-neutral-300 p-2"
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
          defaultValue={assignment?.points ?? 100}
          className="w-full rounded border border-neutral-300 p-2"
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
          defaultValue={assignment?.due ?? ""}
          className="w-full rounded border border-neutral-300 p-2"
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
          defaultValue={assignment?.available ?? ""}
          className="w-full rounded border border-neutral-300 p-2"
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
          defaultValue="2026-09-27"
          className="w-full rounded border border-neutral-300 p-2"
        />
      </div>

      {/* 保留原本的 AI 欄位 */}
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

        <Link
          href={`/courses/${cid}/assignments`}
          id="wd-save"
          className="rounded bg-red-600 px-4 py-2 text-white no-underline"
        >
          Save
        </Link>
      </div>
    </div>
  );
}