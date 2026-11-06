"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAccountContext } from "../AccountContext";

export default function Signin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { users, setCurrentUser } = useAccountContext();
  const router = useRouter();

  const signin = () => {
    const user = users.find(
      (u) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );

    if (!user) {
      setError("Invalid username or password.");
      return;
    }

    setError("");
    setCurrentUser(user);
    router.push("/dashboard");
  };

  return (
    <div
      id="wd-signin-screen"
      className="mx-auto w-full max-w-sm"
    >
      <h1 className="mb-3 text-2xl font-semibold">
        Sign in
      </h1>

      <input
        id="wd-username"
        placeholder="username"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({
            ...credentials,
            username: e.target.value,
          })
        }
        className="wd-username mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />

      <input
        id="wd-password"
        placeholder="password"
        type="password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({
            ...credentials,
            password: e.target.value,
          })
        }
        className="wd-password mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />

      <div className="mb-2">
        <label
          htmlFor="wd-ai-signin-note"
          className="mb-2 block font-medium"
        >
          Sample note
        </label>

        <input
          id="wd-ai-signin-note"
          type="text"
          placeholder="sample note"
          className="w-full rounded border border-neutral-300 px-3 py-2"
        />
      </div>

      {error && (
        <p role="alert" className="mb-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="button"
        id="wd-signin-btn"
        onClick={signin}
        className="mb-2 block w-full rounded bg-blue-600 px-3 py-2 text-center text-white"
      >
        Sign in
      </button>

      <Link
        id="wd-signup-link"
        href="/account/signup"
        className="text-blue-600 underline"
      >
        Sign up
      </Link>
    </div>
  );
}