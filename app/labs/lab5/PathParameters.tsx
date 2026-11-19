"use client";
import { useState } from "react";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function PathParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");
  // On your own: multiply / divide links are included.
  const operations = [
    ["add", "Add", "+"],
    ["subtract", "Subtract", "−"],
    ["multiply", "Multiply", "×"],
    ["divide", "Divide", "÷"],
  ];
  return (
    <section id="wd-path-parameters" className="space-y-3 rounded border p-4">
      <h3 className="text-xl font-semibold">Path Parameters</h3>
      <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
        <label>
          A{" "}
          <input
            aria-label="Path A"
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="w-28 rounded border px-3 py-2"
          />
        </label>
        <label>
          B{" "}
          <input
            aria-label="Path B"
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            className="w-28 rounded border px-3 py-2"
          />
        </label>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "24px",
          marginTop: "12px",
        }}
      >
        {operations.map(([operation, label, symbol]) => (
          <a
            key={operation}
            id={`wd-path-parameter-${operation}`}
            href={`${HTTP_SERVER}/lab5/${operation}/${encodeURIComponent(a)}/${encodeURIComponent(b)}`}
            target="_blank"
            rel="noreferrer"
            className="rounded bg-blue-600 px-3 py-2 text-white"
          >
            {label} {a} {symbol} {b}
          </a>
        ))}
      </div>
    </section>
  );
}
