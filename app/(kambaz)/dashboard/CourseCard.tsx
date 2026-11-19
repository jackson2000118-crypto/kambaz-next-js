"use client";

import Link from "next/link";
import Image from "next/image";
import type { Course } from "../store/coursesStore";

type CourseCardProps = {
  course: Course;
  isEnrolled: boolean;
  disabled: boolean;
  onEdit: () => void;
  onDelete: () => Promise<void>;
  onToggleEnrollment: () => Promise<void>;
};

export default function CourseCard({
  course,
  isEnrolled,
  disabled,
  onEdit,
  onDelete,
  onToggleEnrollment,
}: CourseCardProps) {
  return (
    <div className="wd-dashboard-course w-[300px] max-w-full overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
      <Link
        href={`/courses/${course._id}/home`}
        className="wd-dashboard-course-link block text-neutral-900 no-underline"
        onClick={(event) => {
          if (!isEnrolled) {
            event.preventDefault();
          }
        }}
      >
        <Image
          src={course.image || "/images/reactjs.jpg"}
          width={300}
          height={160}
          alt={course.name}
          className="h-40 w-full object-cover"
        />

        <div className="p-4">
          <h5 className="wd-dashboard-course-title m-0 mb-2 truncate text-lg font-semibold">
            {course.name}
          </h5>

          <p className="wd-dashboard-course-description m-0 mb-3 h-[100px] overflow-hidden text-sm text-neutral-600">
            {course.description}
          </p>

          <span
            className="inline-flex rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white"
            style={{ opacity: isEnrolled ? 1 : 0.5 }}
          >
            {isEnrolled ? "Go" : "Enroll to enter"}
          </span>
        </div>
      </Link>

      <div
        className="px-4 pb-4"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <button
          type="button"
          id="wd-edit-course-click"
          onClick={onEdit}
          disabled={disabled}
          className="rounded bg-yellow-400 px-3 py-1.5 text-sm font-medium"
        >
          Edit
        </button>

        <button
          type="button"
          id="wd-delete-course-click"
          onClick={onDelete}
          disabled={disabled}
          className="rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white"
        >
          Delete
        </button>

        <button
          type="button"
          id={`wd-enrollment-${course._id}`}
          onClick={onToggleEnrollment}
          disabled={disabled}
          className={`rounded px-3 py-1.5 text-sm font-medium text-white ${
            isEnrolled ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {isEnrolled ? "Unenroll" : "Enroll"}
        </button>
      </div>
    </div>
  );
}