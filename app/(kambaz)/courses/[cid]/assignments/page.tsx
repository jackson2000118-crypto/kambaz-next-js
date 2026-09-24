import AssignmentItem from "./AssignmentItem";

export default async function Assignments({
  params,
}: {
  params: Promise<{ cid: string }>;
}) {
  const { cid } = await params;

  return (
    <div id="wd-assignments">
      {/* 搜尋框和按鈕 */}
      <input
      id="wd-search-assignment"
      type="text"
      placeholder="Search for Assignments"
    />
    
    <button id="wd-add-assignment-group" type="button">
        + Group
    </button>

    <button id="wd-add-assignment" type="button">
        + Assignment
    </button>
      {/* 作業群組標題 */}
    <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total
        <button type="button">+</button>
      </h3>

    <ul id="wd-assignment-list">
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
      </ul>
    </div>
  );
}