"use client";
import { useState } from "react";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;
const linkClass = "text-blue-700 underline";
const inputClass = "rounded border px-3 py-2";

export default function WorkingWithRemoteObjects() {
  const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment", description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });

  const [module, setModule] = useState({
    id: "M101", name: "Introduction to Node.js", description: "Learn Express HTTP routes", course: "CS5610",
  });

  return <section id="wd-remote-objects" className="space-y-4 rounded border p-4">
    <h3 className="text-xl font-semibold">5.2.3 Working with Objects</h3>
    <div 
    style={{
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "24px",
      marginBottom: "16px",
    }}>
      <a id="wd-retrieve-assignments" className={linkClass} href={ASSIGNMENT_API_URL} target="_blank" rel="noreferrer">Get Assignment</a>
      <a id="wd-retrieve-assignment-title" className={linkClass} href={`${ASSIGNMENT_API_URL}/title`} target="_blank" rel="noreferrer">Get Title</a>
    </div>

    <div 
    style={{
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "24px",
      marginBottom: "16px",
    }}>
      <label>
        Title 
        <input id="wd-assignment-title" 
        className={inputClass} 
        value={assignment.title} 
        onChange={(e) => setAssignment({ 
          ...assignment, title: e.target.value 
          })} />
          </label>

      <a id="wd-update-assignment-title" 
      className={linkClass} 
      href={`${ASSIGNMENT_API_URL}/title/${encodeURIComponent(assignment.title)}`} 
      target="_blank" 
      rel="noreferrer">Update Title
      </a>
    </div>

    {/* On your own: score, completed, module name and description. */}
    <div 
    style={{
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "24px",
      marginBottom: "16px",
    }}>
      <label>Score <input 
      id="wd-assignment-score" 
      type="number" 
      className={inputClass} 
      value={assignment.score} 
      onChange={(e) => setAssignment({ 
        ...assignment, score: Number(e.target.value) 
        })} />
        </label>
      <a 
      id="wd-update-assignment-score" 
      className={linkClass} 
      href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`} 
      target="_blank" 
      rel="noreferrer">Update Score
      </a>
    </div>

    <div 
    style={{
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "24px",
      marginBottom: "16px",
    }}>
      <label><input 
      id="wd-assignment-completed" 
      type="checkbox" 
      checked={assignment.completed} 
      onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })} /> Completed</label>
      <a 
      id="wd-update-assignment-completed" 
      className={linkClass} 
      href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`} 
      target="_blank" 
      rel="noreferrer">Update Completed
      </a>
    </div>

    <h4 className="font-semibold">Module (On Your Own)</h4>

    <div 
    style={{
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "24px",
      marginBottom: "16px",
    }}>
      <a 
      id="wd-retrieve-module" 
      className={linkClass} 
      href={MODULE_API_URL} 
      target="_blank" 
      rel="noreferrer">Get Module
      </a>
      <a 
      id="wd-retrieve-module-name" 
      className={linkClass} 
      href={`${MODULE_API_URL}/name`} 
      target="_blank" 
      rel="noreferrer">Get Module Name
      </a>
    </div>

    <div 
    style={{
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "24px",
      marginBottom: "16px",
    }}>
      <label>Name <input 
      id="wd-module-name" 
      className={inputClass} 
      value={module.name} 
      onChange={(e) => setModule({ ...module, name: e.target.value })} />
      </label>
      <a 
      id="wd-update-module-name" 
      className={linkClass} 
      href={`${MODULE_API_URL}/name/${encodeURIComponent(module.name)}`} 
      target="_blank" 
      rel="noreferrer">Update Module Name
      </a>

    </div>

    <div 
    style={{
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "24px",
      marginBottom: "16px",
    }}>
      <label>Description 
        <input 
        id="wd-module-description" 
        className={inputClass} 
        value={module.description} 
        onChange={(e) => setModule({ ...module, description: e.target.value })} />
        </label>
      <a 
      id="wd-update-module-description" 
      className={linkClass} 
      href={`${MODULE_API_URL}/description/${encodeURIComponent(module.description)}`} 
      target="_blank" 
      rel="noreferrer">Update Module Description
      </a>
    </div>
    
  </section>;
}
