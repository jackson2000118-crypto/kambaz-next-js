"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAccountContext } from "../AccountContext";
import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const { setCurrentUser } = useAccountContext();
  const router = useRouter();

  const signup = async () => {
    setError("");

    if (!user.username.trim() || !user.password) {
      setError("Please enter a username and password.");
      return;
    }

    if (user.password !== verifyPassword) {
      setError("Passwords do not match.");
      return;
    }

    setPending(true);

    try {
      const currentUser = await client.signup(user);

      setCurrentUser(currentUser);
      router.push("/account/profile");
    } catch (err) {
      if (
        axios.isAxiosError<{ message: string }>(err) &&
        err.response?.data?.message
      ) {
        setError(err.response.data.message);
      } else {
        setError("Unable to sign up. Please try again.");
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <div
      id="wd-signup-screen"
      className="mx-auto w-full max-w-sm"
    >
      <h1 className="mb-3 text-2xl font-semibold">
        Sign up
      </h1>

      <input
        type="text"
        placeholder="username"
        value={user.username}
        onChange={(e) =>
          setUser({
            ...user,
            username: e.target.value,
          })
        }
        className="wd-username mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />

      <input
        type="password"
        placeholder="password"
        value={user.password}
        onChange={(e) =>
          setUser({
            ...user,
            password: e.target.value,
          })
        }
        className="wd-password mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />

      <input
        type="password"
        placeholder="verify password"
        value={verifyPassword}
        onChange={(e) => setVerifyPassword(e.target.value)}
        className="wd-password-verify mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />

      {error && (
        <p role="alert" className="mb-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="button"
        id="wd-signup-btn"
        onClick={signup}
        disabled={pending}
        className="mb-2 block w-full rounded bg-blue-600 px-3 py-2 text-center text-white"
      >
        {pending ? "Signing up..." : "Sign up"}
      </button>

      <Link
        id="wd-signin-link"
        href="/account/signin"
        className="text-blue-600 underline"
      >
        Sign in
      </Link>
    </div>
  );
}