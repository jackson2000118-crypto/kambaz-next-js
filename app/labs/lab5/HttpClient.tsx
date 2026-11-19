"use client";
import { useEffect, useState } from "react";
import * as client from "./client";

export default function HttpClient() {
  const [welcomeOnClick, setWelcomeOnClick] = useState("");
  const [welcomeOnLoad, setWelcomeOnLoad] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    client
      .fetchWelcomeMessage()
      .then(setWelcomeOnLoad)
      .catch((error) => setError(client.errorText(error)));
  }, []);
  const fetchWelcomeOnClick = async () => {
    try {
      setError("");
      setWelcomeOnClick(await client.fetchWelcomeMessage());
    } catch (error) {
      setError(client.errorText(error));
    }
  };
  return (
    <section id="wd-http-client" className="space-y-3 rounded border p-4">
      <h3 className="text-xl font-semibold">5.2.5 HTTP Client</h3>
      <h4 className="font-semibold">Requesting on Click</h4>
      <button
        type="button"
        onClick={fetchWelcomeOnClick}
        className="rounded bg-blue-600 px-3 py-2 text-white"
      >
        Fetch Welcome
      </button>
      <p>
        Response from server: <b>{welcomeOnClick}</b>
      </p>
      <h4 className="font-semibold">Requesting on Load</h4>
      <p>
        Response from server: <b>{welcomeOnLoad}</b>
      </p>
      {error && (
        <p role="alert" className="rounded bg-red-100 p-3 text-red-800">
          {error}
        </p>
      )}
    </section>
  );
}
