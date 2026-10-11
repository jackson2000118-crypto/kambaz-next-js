import { FaPlus, FaSearch } from "react-icons/fa";
import AssignmentItem from "./AssignmentItem";

export default async function Assignments({
  params,
}: {
  params: Promise<{ cid: string }>;
}) {
  const { cid } = await params;

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
          className="rounded border border-neutral-300 bg-white px-2 py-0.5 text-sm"
        >
          <FaPlus />
        </button>
      </h3>

      <ul id="wd-assignment-list" className="m-0 list-none p-0">
        <AssignmentItem
          cid={cid}
          aid="A1"
          title="A1 - ENV + HTML"
          details="Due September 27 at 11:59pm | 100 pts"
        />

        <AssignmentItem
          cid={cid}
          aid="A2"
          title="A2 - CSS + TAILWIND"
          details="Due September 28 at 11:59pm | 100 pts"
        />

        <AssignmentItem
          cid={cid}
          aid="A3"
          title="A3 - JS + REACT"
          details="Due September 27 at 11:59pm | 100 pts"
        />

        <AssignmentItem
          cid={cid}
          aid="own-a"
          title="A5 - Express REST + Render"
          details="Due Nov 22 at 11:59pm | 100 pts"
        />

        {/* AI */}
        <AssignmentItem
          cid={cid}
          aid="ai-a"
          title="A9 - Sample assignment"
          details="Due October 25 at 11:59pm | 100 pts"
        />
      </ul>
    </div>
  );
}