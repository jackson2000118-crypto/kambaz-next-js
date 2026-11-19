"use client";
import { useState } from "react";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function QueryParameters() {
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
    <section id="wd-query-parameters" className="space-y-3 rounded border p-4">
      <h3 className="text-xl font-semibold">Query Parameters</h3>
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
            aria-label="Query A"
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="w-28 rounded border px-3 py-2"
          />
        </label>
        <label>
          B{" "}
          <input
            aria-label="Query B"
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
            id={`wd-query-parameter-${operation}`}
            href={`${HTTP_SERVER}/lab5/calculator?${new URLSearchParams({ a, b, operation })}`}
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
