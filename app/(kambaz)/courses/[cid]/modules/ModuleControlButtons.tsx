"use client";

import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons({
  disabled,
  onEdit,
  onDelete,
}: {
  disabled: boolean;
  onEdit: () => void;
  onDelete: () => Promise<void>;
}) {
  return (
    <div
      className="flex items-center gap-2"
      style={{ display: "flex", alignItems: "center", gap: "12px" }}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={onEdit}
        title="Edit module"
        aria-label="Edit module"
        className="text-blue-600 disabled:opacity-50"
      >
        <FaPencilAlt />
      </button>

      <button
        type="button"
        disabled={disabled}
        onClick={onDelete}
        title="Delete module"
        aria-label="Delete module"
        className="text-red-600 disabled:opacity-50"
      >
        <FaTrash />
      </button>

      <GreenCheckmark />
      <BsPlus className="text-3xl" />
      <IoEllipsisVertical className="text-xl" />
    </div>
  );
}
