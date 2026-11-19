"use client";
import { useEffect, useState } from "react";
import * as client from "./client";

export default function HelloRoute() {
  const [hello, setHello] = useState<{ message?: string }>({});
  const [error, setError] = useState("");
  // §5.3 Style 4: client.ts owns the fetch URL.
  useEffect(() => {
    client
      .fetchHello()
      .then(setHello)
      .catch((error) => setError(client.errorText(error)));
  }, []);
  return (
    <section id="wd-next-hello" className="space-y-3 rounded border p-4">
      <h3 className="text-xl font-semibold">5.3 HelloRoute</h3>
      <p>GET /api/lab5/hello (Next.js Route Handler)</p>
      {error && (
        <p role="alert" className="rounded bg-red-100 p-3 text-red-800">
          {error}
        </p>
      )}
      <p>{hello.message}</p>
      <pre className="overflow-auto rounded bg-slate-100 p-3 text-slate-900">
        {JSON.stringify(hello, null, 2)}
      </pre>
    </section>
  );
}
