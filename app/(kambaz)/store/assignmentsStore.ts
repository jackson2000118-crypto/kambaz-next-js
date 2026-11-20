"use client";

import { create } from "zustand";

export type Assignment = {
  _id: string;
  title: string;
  course: string;
  description: string;
  points: number;
  due: string;
  available: string;
  availableUntil?: string;
  group?: string;
  displayGradeAs?: string;
  submissionType?: string;
  onlineEntryOptions?: string[];
  assignTo?: string;
  notes?: string;
};

type AssignmentsStore = {
  assignments: Assignment[];
  setAssignments: (assignments: Assignment[]) => void;
  addAssignment: (assignment: Assignment) => void;
  deleteAssignment: (assignmentId: string) => void;
  updateAssignment: (assignment: Assignment) => void;
};

export const useAssignmentsStore = create<AssignmentsStore>((set) => ({
  assignments: [],

  setAssignments: (assignments) => {
    set({ assignments });
  },

  addAssignment: (assignment) =>
    set((state) => ({
      assignments: [...state.assignments, assignment]
    })),

  deleteAssignment: (assignmentId) =>
    set((state) => ({
      assignments: state.assignments.filter(
        (assignment) => assignment._id !== assignmentId
      )
    })),

  updateAssignment: (assignment) =>
    set((state) => ({
      assignments: state.assignments.map((existing) =>
        existing._id === assignment._id ? assignment : existing
      )
    }))
}));
