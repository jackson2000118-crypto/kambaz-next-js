"use client";

import { create } from "zustand";
import enrollmentsJson from "../database/enrollments.json";

export type Enrollment = (typeof enrollmentsJson)[number];

type EnrollmentsStore = {
  enrollments: Enrollment[];
  enroll: (userId: string, courseId: string) => void;
  unenroll: (userId: string, courseId: string) => void;
};

export const useEnrollmentsStore = create<EnrollmentsStore>((set) => ({
  enrollments: enrollmentsJson,

  enroll: (userId, courseId) =>
    set((state) => {
      const alreadyEnrolled = state.enrollments.some(
        (e) => e.user === userId && e.course === courseId
      );

      if (alreadyEnrolled) return state;

      const newEnrollment: Enrollment = {
        _id: crypto.randomUUID(),
        user: userId,
        course: courseId,
      };

      return {
        enrollments: [...state.enrollments, newEnrollment],
      };
    }),

  unenroll: (userId, courseId) =>
    set((state) => ({
      enrollments: state.enrollments.filter(
        (e) => !(userId === e.user && e.course === courseId)
      ),
    })),
}));