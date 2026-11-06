"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccountContext, type User } from "../AccountContext";

export default function Profile() {
  const [profile, setProfile] = useState<User | null>(null);
  const { currentUser, setCurrentUser } = useAccountContext();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.replace("/account/signin");
      return;
    }

    setProfile({ ...currentUser });
  }, [currentUser, router]);

  const signout = () => {
    setCurrentUser(null);
    router.push("/account/signin");
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
          value={profile.firstName}
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
          value={profile.lastName}
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
          value={profile.email}
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
          value={profile.role}
          onChange={(e) =>
            setProfile({ ...profile, role: e.target.value })
          }
          className="w-full rounded border border-neutral-300 bg-white px-3 py-2"
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
          <option value="TA">Teaching Assistant</option>
        </select>
      </div>

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