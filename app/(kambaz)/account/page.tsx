"use client";

import { redirect } from "next/navigation";
import { useAccountContext } from "./AccountContext";

export default function AccountPage() {
  const { currentUser } = useAccountContext();

  if (currentUser) {
    redirect("/account/profile");
  } else {
    redirect("/account/signin");
  }
}