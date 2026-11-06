"use client";

import { useParams } from "next/navigation";

export default function PathCalculator() {
  const params = useParams<{ a: string; b: string }>();

  const a = parseFloat(params.a);
  const b = parseFloat(params.b);

  return (
    <div id="wd-path-calculator">
      <h1>Calculator – Path Parameters</h1>

      <p>
        a = <code>{params.a}</code>
      </p>

      <p>
        b = <code>{params.b}</code>
      </p>

      <h2 className="text-green-700">Sum = {a + b}</h2>
    </div>
  );
}