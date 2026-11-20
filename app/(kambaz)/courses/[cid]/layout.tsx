"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa6";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";
import {
  useCoursesStore,
  type Course,
} from "../../store/coursesStore";
import { useAccountContext } from "../../account/AccountContext";
import * as client from "../client";

export default function CoursesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { cid } = useParams();
  const courseId = typeof cid === "string" ? cid : "";
  const router = useRouter();

  const { currentUser } = useAccountContext();
  const userId = currentUser?._id;
  const setCourses = useCoursesStore((state) => state.setCourses);

  const [course, setCourse] = useState<Course | null>(null);
  const [checkedUserId, setCheckedUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCourseNav, setShowCourseNav] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const checkEnrollment = async () => {
      setLoading(true);
      setError("");
      setCourse(null);
      setCheckedUserId("");

      if (!userId) {
        router.replace("/account/signin");
        return;
      }

      try {
        const myCourses = await client.findMyCourses();

        if (cancelled) {
          return;
        }

        const enrolledCourse = myCourses.find(
          (item) => item._id === courseId
        );

        if (!enrolledCourse) {
          router.replace("/dashboard");
          return;
        }

        setCourses(myCourses);
        setCourse(enrolledCourse);
        setCheckedUserId(userId);
      } catch {
        if (!cancelled) {
          setError("Unable to load course. Please refresh and try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    checkEnrollment();

    return () => {
      cancelled = true;
    };
  }, [courseId, userId, router, setCourses]);

  if (error) {
    return (
      <p role="alert" className="text-red-600">
        {error}
      </p>
    );
  }

  if (
    loading ||
    !course ||
    course._id !== courseId ||
    checkedUserId !== userId
  ) {
    return <p>Loading course...</p>;
  }

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

        <span className="ms-2 text-sm">
          ({course._id})
        </span>
      </h2>

      <hr className="my-3" />

      <div className="flex gap-4">
        {showCourseNav && (
          <div className="hidden w-[140px] shrink-0 md:block">
            <CourseNavigation cid={courseId} />
          </div>
        )}

        <div className="min-w-0 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}