"use client";

import { useEffect, useRef, useState } from "react";
import CourseCard from "./CourseCard";
import { useAccountContext } from "../account/AccountContext";
import * as client from "../courses/client";
import * as enrollmentsClient from "../enrollments/client";
import {
  emptyCourse,
  useCoursesStore,
  type Course,
} from "../store/coursesStore";

export default function Dashboard() {
  const courses = useCoursesStore((state) => state.courses);
  const setCourses = useCoursesStore((state) => state.setCourses);

  const { currentUser } = useAccountContext();
  const userId = currentUser?._id;

  const [course, setCourse] = useState<Course>({
    ...emptyCourse,
  });
  const [myCourseIds, setMyCourseIds] = useState<string[]>([]);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  const mutationPending = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const loadCourses = async () => {
      setLoading(true);
      setError("");
      setCourses([]);
      setMyCourseIds([]);

      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const [myCourses, displayedCourses] = await Promise.all([
          client.findMyCourses(),
          showAllCourses
            ? client.fetchAllCourses()
            : Promise.resolve(null),
        ]);

        if (!cancelled) {
          setMyCourseIds(
            myCourses.map((course: Course) => course._id)
          );

          setCourses(displayedCourses ?? myCourses);
        }
      } catch {
        if (!cancelled) {
          setError("Unable to load courses. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadCourses();

    return () => {
      cancelled = true;
    };
  }, [userId, showAllCourses, reload, setCourses]);

  const runMutation = async (
    action: () => Promise<void>,
    errorMessage: string
  ) => {
    if (!userId || mutationPending.current) {
      return;
    }

    mutationPending.current = true;
    setSaving(true);
    setError("");

    try {
      await action();

      setReload((value) => value + 1);
    } catch {
      setError(errorMessage);
    } finally {
      mutationPending.current = false;
      setSaving(false);
    }
  };

  const onAddCourse = async () => {
    await runMutation(async () => {
      await client.createCourse(course);

      setCourse({ ...emptyCourse });
    }, "Unable to create course. Please try again.");
  };

  const onUpdateCourse = async () => {
    if (course._id === "0") {
      return;
    }

    await runMutation(async () => {
      const saved = await client.updateCourse(course);

      setCourse({ ...saved });
    }, "Unable to update course. Please try again.");
  };

  const onDeleteCourse = async (courseId: string) => {
    await runMutation(async () => {
      await client.deleteCourse(courseId);

      if (course._id === courseId) {
        setCourse({ ...emptyCourse });
      }
    }, "Unable to delete course. Please try again.");
  };

  const onToggleEnrollment = async (
    courseId: string,
    isEnrolled: boolean
  ) => {
    await runMutation(async () => {
      if (isEnrolled) {
        await enrollmentsClient.unenrollFromCourse(courseId);
      } else {
        await enrollmentsClient.enrollIntoCourse(courseId);
      }
    }, "Unable to change enrollment. Please try again.");
  };

  const busy = loading || saving;

  return (
    <div id="wd-dashboard">
      <div
        className="flex items-center justify-between gap-2"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <h1 id="wd-dashboard-title">
          Dashboard
        </h1>

        <button
          type="button"
          id="wd-enrollments-toggle"
          disabled={busy || !userId}
          onClick={() => setShowAllCourses(!showAllCourses)}
          className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white"
        >
          {showAllCourses ? "My Courses" : "Enrollments"}
        </button>
      </div>

      <hr />

      <h5
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "12px",
        }}
      >
        New Course

        <button
          type="button"
          id="wd-add-new-course-click"
          onClick={onAddCourse}
          disabled={busy || !userId}
          className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white"
        >
          Add
        </button>

        <button
          type="button"
          id="wd-update-course-click"
          onClick={onUpdateCourse}
          disabled={busy || !userId || course._id === "0"}
          className="rounded bg-yellow-400 px-3 py-1.5 text-sm font-medium"
        >
          Update
        </button>
      </h5>

      <input
        type="text"
        id="wd-course-name"
        aria-label="Course name"
        className="mb-2 mt-2 block w-full max-w-xl rounded border border-neutral-300 px-3 py-1.5"
        value={course.name}
        onChange={(e) =>
          setCourse({ ...course, name: e.target.value })
        }
      />

      <textarea
        id="wd-course-description"
        aria-label="Course description"
        className="mb-3 block w-full max-w-xl rounded border border-neutral-300 px-3 py-1.5"
        rows={3}
        value={course.description}
        onChange={(e) =>
          setCourse({ ...course, description: e.target.value })
        }
      />

      <input
        type="text"
        id="wd-course-number"
        aria-label="Course number"
        className="mb-2 block w-full max-w-xl rounded border border-neutral-300 px-3 py-1.5"
        value={course.number}
        onChange={(e) =>
          setCourse({ ...course, number: e.target.value })
        }
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <input
          type="text"
          id="wd-my-course-number"
          aria-label="My course number"
          value={course.number}
          onChange={(e) =>
            setCourse({ ...course, number: e.target.value })
          }
        />

        <input
          type="date"
          id="we-my-start-date"
          aria-label="Course start date"
          value={course.startDate}
          onChange={(e) =>
            setCourse({ ...course, startDate: e.target.value })
          }
        />
      </div>

      <hr />

      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "My Courses"} ({courses.length})
      </h2>

      {loading && (
        <p role="status">
          Loading courses...
        </p>
      )}

      {saving && (
        <p role="status">
          Saving changes...
        </p>
      )}

      {error && (
        <p role="alert" className="text-red-600">
          {error}
        </p>
      )}

      {!userId && (
        <p>
          Please sign in to view your courses.
        </p>
      )}

      {userId && !loading && !error && courses.length === 0 && (
        <p>
          {showAllCourses
            ? "No courses available."
            : "You are not enrolled in any courses."}
        </p>
      )}

      <hr />

      <div
        id="wd-dashboard-courses"
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      >
        {courses.map((c) => {
          const isEnrolled = myCourseIds.includes(c._id);

          return (
            <CourseCard
              key={c._id}
              course={c}
              isEnrolled={isEnrolled}
              disabled={busy || !userId}
              onEdit={() => setCourse({ ...c })}
              onDelete={() => onDeleteCourse(c._id)}
              onToggleEnrollment={() =>
                onToggleEnrollment(c._id, isEnrolled)
              }
            />
          );
        })}
      </div>
    </div>
  );
}