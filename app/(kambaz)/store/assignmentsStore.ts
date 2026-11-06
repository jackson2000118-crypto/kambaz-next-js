"use client";

import { create } from "zustand";
import assignmentsJson from "../database/assignments.json";

export type Assignment = (typeof assignmentsJson)[number] & {
  availableUntil?: string;
};

type AssignmentsStore = {
  assignments: Assignment[];
  addAssignment: (assignment: Assignment) => void;
  deleteAssignment: (assignmentId: string) => void;
  updateAssignment: (assignment: Assignment) => void;
};

export const useAssignmentsStore = create<AssignmentsStore>(
  (set) => ({
    assignments: assignmentsJson,

    addAssignment: (assignment) =>
      set((state) => ({
        assignments: [
            ...state.assignments,
            {...assignment, _id:crypto.randomUUID()}
        ],
      })),

    deleteAssignment: (assignmentId) =>
      set((state) => ({
        assignments: state.assignments.filter((assignment) => assignment._id !== assignmentId),
      })),

    updateAssignment: (assignment) =>
      set((state) => ({                         
        assignments: state.assignments.map((a) => 
            a._id === assignment._id ? assignment : a),
      })),
  })
);