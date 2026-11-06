"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAccountContext } from "./AccountContext";

export default function AccountNavigation() {
  const pathname = usePathname();
  const { currentUser } = useAccountContext();

  const links = currentUser
    ? [{ path: "profile", label: "Profile" }]
    : [
        { path: "signin", label: "Signin" },
        { path: "signup", label: "Signup" },
      ];

  return (
    <div
      id="wd-account-navigation"
      className="wd list-group rounded-none text-lg"
    >
      {links.map((link) => {
        const href = `/account/${link.path}`;

        return (
          <Link
            key={link.path}
            href={href}
            className={
              pathname === href
                ? "list-group-item active border-0"
                : "list-group-item border-0 text-red-600"
            }
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}