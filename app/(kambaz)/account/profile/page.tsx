"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccountContext, type User } from "../AccountContext";
import * as client from "../client";

export default function Profile() {
  const [profile, setProfile] = useState<User | null>(null);
  const { currentUser, setCurrentUser } = useAccountContext();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      router.replace("/account/signin");
      return;
    }

    setProfile({ ...currentUser });
  }, [currentUser, router]);

const updateProfile = async () => {
  if (!profile) {
    return;
  }

  setMessage("");
  setSaving(true);

  try {
    const user = await client.updateUser(profile);

    setCurrentUser(user);
    setMessage("Profile updated successfully.");
  } catch {
    setMessage("Unable to update profile. Please try again.");
  } finally {
    setSaving(false);
  }
};

  const signout = async () => {
    setMessage("");

    try {
      await client.signout();

      setCurrentUser(null);
      router.push("/account/signin");
    } catch {
      setMessage("Unable to sign out. Please try again.");
    }
  };

  if (!currentUser || !profile) return null;

  return (
    <div id="wd-profile-screen" className="mx-auto w-full max-w-sm">
      <h3 className="mb-3 text-2xl font-semibold">
        Profile
      </h3>

      <div className="mb-3">
        <label
          htmlFor="wd-profile-username"
          className="mb-1 block font-medium"
        >
          Username
        </label>

        <input
          id="wd-profile-username"
          placeholder="username"
          value={profile.username}
          onChange={(e) =>
            setProfile({ ...profile, username: e.target.value })
          }
          className="wd-username w-full rounded border border-neutral-300 px-3 py-2"
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="wd-profile-password"
          className="mb-1 block font-medium"
        >
          Password
        </label>

        <input
          id="wd-profile-password"
          placeholder="password"
          type="password"
          value={profile.password}
          onChange={(e) =>
            setProfile({ ...profile, password: e.target.value })
          }
          className="wd-password w-full rounded border border-neutral-300 px-3 py-2"
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="wd-firstname"
          className="mb-1 block font-medium"
        >
          First Name
        </label>

        <input
          id="wd-firstname"
          placeholder="First Name"
          value={profile.firstName ?? ""}
          onChange={(e) =>
            setProfile({ ...profile, firstName: e.target.value })
          }
          className="w-full rounded border border-neutral-300 px-3 py-2"
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="wd-lastname"
          className="mb-1 block font-medium"
        >
          Last Name
        </label>

        <input
          id="wd-lastname"
          placeholder="Last Name"
          value={profile.lastName ?? ""}
          onChange={(e) =>
            setProfile({ ...profile, lastName: e.target.value })
          }
          className="w-full rounded border border-neutral-300 px-3 py-2"
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="wd-email"
          className="mb-1 block font-medium"
        >
          Email
        </label>

        <input
          id="wd-email"
          type="email"
          value={profile.email ?? ""}
          onChange={(e) =>
            setProfile({ ...profile, email: e.target.value })
          }
          className="w-full rounded border border-neutral-300 px-3 py-2"
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="wd-role"
          className="mb-1 block font-medium"
        >
          Role
        </label>

        <select
          id="wd-role"
          value={profile.role ?? ""}
          onChange={(e) =>
            setProfile({ ...profile, role: e.target.value })
          }
          className="w-full rounded border border-neutral-300 bg-white px-3 py-2"
        >
          <option value="" disabled>
            Select a role
          </option>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
          <option value="TA">Teaching Assistant</option>
        </select>
      </div>

      {message && (
        <p role="status" className="mb-2">
          {message}
        </p>
      )}

      <button
        type="button"
        id="wd-update-profile-btn"
        onClick={updateProfile}
        disabled={saving}
        className="mb-2 block w-full rounded bg-green-600 px-3 py-2 text-center text-white"
      >
        {saving ? "Saving..." : "Update Profile"}
      </button>

      <button
        type="button"
        id="wd-signout-btn"
        onClick={signout}
        className="block w-full rounded bg-blue-600 px-3 py-2 text-center text-white"
      >
        Sign out
      </button>
    </div>
  );
}