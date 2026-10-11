import Link from "next/link";

export default function Profile() {
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
          defaultValue="alice"
          placeholder="username"
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
          defaultValue="123"
          placeholder="password"
          type="password"
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
          defaultValue="Alice"
          placeholder="First Name"
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
          defaultValue="Wonderland"
          placeholder="Last Name"
          className="w-full rounded border border-neutral-300 px-3 py-2"
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="wd-dob"
          className="mb-1 block font-medium"
        >
          Date of Birth
        </label>

        <input
          id="wd-dob"
          defaultValue="2000-01-01"
          type="date"
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
          defaultValue="alice@wonderland"
          type="email"
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
          defaultValue="FACULTY"
          className="w-full rounded border border-neutral-300 bg-white px-3 py-2"
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </select>
      </div>

      <Link
        href="/account/signin"
        className="block w-full rounded bg-blue-600 px-3 py-2 text-center text-white no-underline"
      >
        Sign out
      </Link>
    </div>
  );
}