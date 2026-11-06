"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import {
  emptyUser,
  useAccountContext,
  type User,
} from "../../../../account/AccountContext";
import { useEnrollmentsStore } from "../../../../store/enrollmentsStore";

const fields = [
  { key: "firstName", label: "First Name", type: "text" },
  { key: "lastName", label: "Last Name", type: "text" },
  { key: "username", label: "Username", type: "text" },
  { key: "password", label: "Password", type: "password" },
  { key: "email", label: "Email", type: "email" },
  { key: "loginId", label: "Login ID", type: "text" },
  { key: "section", label: "Section", type: "text" },
] as const;

export default function PeopleTable() {
  const params = useParams();
  const cid = typeof params.cid === "string" ? params.cid : "";

  const { users, addUser, updateUser } = useAccountContext();

  const enrollments = useEnrollmentsStore(
    (state) => state.enrollments
  );
  const enroll = useEnrollmentsStore((state) => state.enroll);
  const unenroll = useEnrollmentsStore((state) => state.unenroll);

  // On your own：表單從 AccountContext 的共用空白使用者開始。
  const [person, setPerson] = useState<User>({ ...emptyUser });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const enrolled = users.filter((user) =>
    enrollments.some(
      (e) => e.user === user._id && e.course === cid
    )
  );

  const resetForm = () => {
    setPerson({ ...emptyUser });
    setEditingId(null);
    setMessage("");
  };

  const savePerson = () => {
    if (!person.firstName.trim() || !person.username.trim()) {
      setMessage("Please enter a first name and username.");
      return;
    }

    const duplicateUsername = users.some(
      (user) =>
        user.username === person.username.trim() &&
        user._id !== editingId
    );

    if (duplicateUsername) {
      setMessage("This username is already in use.");
      return;
    }

    const draft = {
      ...person,
      firstName: person.firstName.trim(),
      lastName: person.lastName.trim(),
      username: person.username.trim(),
    };

    if (editingId) {
      // On your own：只更新目前課程中的使用者。
      const isInCourse = enrollments.some(
        (e) => e.user === editingId && e.course === cid
      );

      if (!isInCourse) {
        setMessage("This person is no longer enrolled in this course.");
        return;
      }

      updateUser({ ...draft, _id: editingId });
    } else {
      // On your own：建立使用者後，加入目前這門課。
      const newUser = addUser(draft);
      enroll(newUser._id, cid);
    }

    resetForm();
  };

  const editPerson = (user: User) => {
    setPerson({ ...user });
    setEditingId(user._id);
    setMessage("");
  };

  const removePerson = (user: User) => {
    const confirmed = window.confirm(
      `Remove ${user.firstName} ${user.lastName} from this course?`
    );

    if (!confirmed) return;

    // On your own：移除選課紀錄，保留使用者帳號。
    unenroll(user._id, cid);

    if (editingId === user._id) {
      resetForm();
    }
  };

  return (
    <div id="wd-people-table">
      <h2 className="mb-3 text-xl font-semibold">People</h2>

      <div className="mb-4 rounded border border-neutral-300 p-3">
        <h3 className="mb-3 font-semibold">
          {editingId ? "Edit Person" : "Add Person"}
        </h3>

        {/* On your own：使用 controlled inputs 編輯使用者。 */}
        <div className="grid gap-3 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field.key}>
              <label
                htmlFor={`wd-person-${field.key}`}
                className="mb-1 block font-medium"
              >
                {field.label}
              </label>

              <input
                id={`wd-person-${field.key}`}
                type={field.type}
                value={person[field.key]}
                onChange={(e) =>
                  setPerson({
                    ...person,
                    [field.key]: e.target.value,
                  })
                }
                className="w-full rounded border border-neutral-300 px-3 py-1.5"
              />
            </div>
          ))}

          <div>
            <label
              htmlFor="wd-person-role"
              className="mb-1 block font-medium"
            >
              Role
            </label>

            <select
              id="wd-person-role"
              value={person.role}
              onChange={(e) =>
                setPerson({ ...person, role: e.target.value })
              }
              className="w-full rounded border border-neutral-300 bg-white px-3 py-1.5"
            >
              <option value="STUDENT">Student</option>
              <option value="TA">TA</option>
              <option value="FACULTY">Faculty</option>
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
            </select>
          </div>
        </div>

        {message && (
          <p role="alert" className="mt-2 text-sm text-red-600">
            {message}
          </p>
        )}

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            id="wd-save-person"
            onClick={savePerson}
            className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
          >
            {editingId ? "Update" : "Add"}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="rounded border border-neutral-300 px-3 py-1.5 text-sm"
          >
            Cancel
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-300">
              <th className="p-2">Name</th>
              <th className="p-2">Login ID</th>
              <th className="p-2">Section</th>
              <th className="p-2">Role</th>
              <th className="p-2">Last Activity</th>
              <th className="p-2">Total Activity</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {enrolled.map((user) => (
              <tr key={user._id} className="odd:bg-neutral-50">
                <td className="wd-full-name p-2 text-nowrap">
                  <FaUserCircle className="me-2 inline text-4xl text-neutral-500" />

                  <span className="wd-first-name">
                    {user.firstName}
                  </span>{" "}
                  <span className="wd-last-name">
                    {user.lastName}
                  </span>
                </td>

                <td className="wd-login-id p-2">
                  {user.loginId}
                </td>

                <td className="wd-section p-2">
                  {user.section}
                </td>

                <td className="wd-role p-2">
                  {user.role}
                </td>

                <td className="wd-last-activity p-2">
                  {user.lastActivity}
                </td>

                <td className="wd-total-activity p-2">
                  {user.totalActivity}
                </td>

                <td className="p-2">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => editPerson(user)}
                      className="rounded bg-yellow-400 px-2 py-1 text-sm"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => removePerson(user)}
                      className="rounded bg-red-600 px-2 py-1 text-sm text-white"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {enrolled.length === 0 && (
              <tr>
                <td colSpan={7} className="p-3 text-neutral-500">
                  No people enrolled in this course.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}