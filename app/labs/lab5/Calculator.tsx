"use client";
import { useRef, useState } from "react";
import * as client from "./client";
import type { CalculatorResult } from "./types";

const symbols: Record<string, string> = {
  add: "+",
  subtract: "−",
  multiply: "×",
  divide: "÷",
};
export default function CalculatorNextWebApiClient() {
  const [a, setA] = useState("10");
  const [b, setB] = useState("5");
  const [operation, setOperation] = useState("add");
  const [answer, setAnswer] = useState<CalculatorResult | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  // Ignore a stale response if the user switches operations quickly.
  const latestRequest = useRef(0);
  const calculate = async (selectedOperation = operation) => {
    const requestId = ++latestRequest.current;
    setBusy(true);
    setError("");
    setAnswer(null);
    try {
      const result = await client.calculate(a, b, selectedOperation);
      if (requestId === latestRequest.current) {
        setAnswer(result);
      }
    } catch (error) {
      if (requestId === latestRequest.current) {
        setError(client.errorText(error));
      }
    } finally {
      if (requestId === latestRequest.current) {
        setBusy(false);
      }
    }
  };
  return (
    <section id="wd-next-calculator" className="space-y-3 rounded border p-4">
      <h3 className="text-xl font-semibold">
        5.3.1 Calculator (Next.js Web API)
      </h3>
      <div className="flex flex-wrap items-end gap-3">
        <label>
          A:
          <input
            aria-label="Calculator A"
            type="number"
            step="any"
            className="ml-2 w-28 rounded border px-3 py-2"
            value={a}
            onChange={(e) => setA(e.target.value)}
          />
        </label>
        <label>
          B:
          <input
            aria-label="Calculator B"
            type="number"
            step="any"
            className="ml-2 w-28 rounded border px-3 py-2"
            value={b}
            onChange={(e) => setB(e.target.value)}
          />
        </label>
        <label>
          Operation:
          <select
            aria-label="Calculator operation"
            value={operation}
            className="ml-2 rounded border px-3 py-2"
            onChange={(e) => {
              setOperation(e.target.value);
              void calculate(e.target.value);
            }}
          >
            <option value="add">+</option>
            <option value="subtract">−</option>
            <option value="multiply">×</option>
            <option value="divide">÷</option>
            <option value="unknown">Unknown (error test)</option>
          </select>
        </label>
        <button
          type="button"
          onClick={() => calculate()}
          disabled={busy}
          className="rounded bg-blue-600 px-3 py-2 text-white disabled:opacity-50"
        >
          {busy ? "Calculating…" : "Calculate"}
        </button>
      </div>
      <input
        aria-label="Calculator result"
        readOnly
        className="w-full rounded border px-3 py-2"
        value={
          answer
            ? `${answer.a} ${symbols[answer.operation] || answer.operation} ${answer.b} = ${answer.result}`
            : ""
        }
        placeholder="Result"
      />
      {error && (
        <p
          id="wd-calculator-error"
          role="alert"
          className="rounded bg-red-100 px-3 py-2 text-red-800"
        >
          {error}
        </p>
      )}
      {answer && (
        <pre className="overflow-auto rounded bg-slate-100 p-3 text-slate-900">
          {JSON.stringify(answer, null, 2)}
        </pre>
      )}
    </section>
  );
}
