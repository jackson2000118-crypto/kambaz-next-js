"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa6";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";
import { useCoursesStore } from "../../store/coursesStore";
import { useEnrollmentsStore } from "../../store/enrollmentsStore";
import { useAccountContext } from "../../account/AccountContext";

export default function CoursesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { cid } = useParams();
  const courseId = typeof cid === "string" ? cid : "";
  const router = useRouter();

  const { currentUser } = useAccountContext();
  const courses = useCoursesStore((state) => state.courses);
  const enrollments = useEnrollmentsStore(
    (state) => state.enrollments
  );

  const course = courses.find((c) => c._id === courseId);
  const [showCourseNav, setShowCourseNav] = useState(true);

  const isEnrolled = enrollments.some(
    (e) =>
      e.user === currentUser?._id &&
      e.course === courseId
  );

  // 未登入可存取；登入後必須已選課。
  const canAccess = Boolean(
    course && (!currentUser || isEnrolled)
  );

  useEffect(() => {
    if (!canAccess) {
      router.replace("/dashboard");
    }
  }, [canAccess, router]);

  if (!canAccess) return null;

  return (
    <div id="wd-courses">
      <h2 className="text-2xl font-semibold text-red-600">
        <button
          type="button"
          onClick={() => setShowCourseNav(!showCourseNav)}
          aria-label="Toggle course navigation"
          aria-expanded={showCourseNav}
          className="me-4 inline-flex items-center align-middle"
        >
          <FaAlignJustify className="text-xl" />
        </button>

        <Breadcrumb course={course} />

        <span className="ms-2 text-sm">({course?._id})</span>
      </h2>

      <hr className="my-3" />

      <div className="flex gap-4">
        {showCourseNav && (
          <div className="hidden w-[140px] shrink-0 md:block">
            <CourseNavigation cid={courseId} />
          </div>
        )}

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}