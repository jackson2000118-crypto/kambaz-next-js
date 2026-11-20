import type { Assignment } from "../store/assignmentsStore";
import axios from "axios";
import type { CourseModule } from "../store/modulesStore";
import type { Course } from "../store/coursesStore";

const axiosWithCredentials = axios.create({
  withCredentials: true
});

const HTTP_SERVER =
  process.env.NEXT_PUBLIC_KAMBAZ_SERVER ||
  process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;

export const fetchAllCourses = async (): Promise<Course[]> => {
  const response = await axiosWithCredentials.get(COURSES_API);
  return response.data;
};

export const findMyCourses = async (): Promise<Course[]> => {
  const response = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`
  );
  return response.data;
};

export const createCourse = async (course: Course): Promise<Course> => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course
  );
  return response.data;
};

export const deleteCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.delete(
    `${COURSES_API}/${encodeURIComponent(courseId)}`
  );
  return response.data;
};

export const updateCourse = async (course: Course): Promise<Course> => {
  const response = await axiosWithCredentials.put(
    `${COURSES_API}/${encodeURIComponent(course._id)}`,
    course
  );
  return response.data;
};

const MODULES_API = `${HTTP_SERVER}/api/modules`;

export const findModulesForCourse = async (
  courseId: string
): Promise<CourseModule[]> => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${encodeURIComponent(courseId)}/modules`
  );

  return response.data;
};

export const createModuleForCourse = async (
  courseId: string,
  module: { name: string }
): Promise<CourseModule> => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${encodeURIComponent(courseId)}/modules`,
    module
  );

  return response.data;
};

export const deleteModule = async (moduleId: string) => {
  const response = await axiosWithCredentials.delete(
    `${MODULES_API}/${encodeURIComponent(moduleId)}`
  );

  return response.data;
};

export const updateModule = async (
  module: CourseModule
): Promise<CourseModule> => {
  const response = await axiosWithCredentials.put(
    `${MODULES_API}/${encodeURIComponent(module._id)}`,
    {
      name: module.name,
      description: module.description
    }
  );

  return response.data;
};

const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;

export const findAssignmentsForCourse = async (
  courseId: string
): Promise<Assignment[]> => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${encodeURIComponent(courseId)}/assignments`
  );

  return response.data;
};

export const findAssignmentById = async (
  assignmentId: string
): Promise<Assignment> => {
  const response = await axiosWithCredentials.get(
    `${ASSIGNMENTS_API}/${encodeURIComponent(assignmentId)}`
  );

  return response.data;
};

export const createAssignmentForCourse = async (
  courseId: string,
  assignment: Assignment
): Promise<Assignment> => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${encodeURIComponent(courseId)}/assignments`,
    assignment
  );

  return response.data;
};

export const updateAssignment = async (
  assignment: Assignment
): Promise<Assignment> => {
  const response = await axiosWithCredentials.put(
    `${ASSIGNMENTS_API}/${encodeURIComponent(assignment._id)}`,
    assignment
  );

  return response.data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const response = await axiosWithCredentials.delete(
    `${ASSIGNMENTS_API}/${encodeURIComponent(assignmentId)}`
  );

  return response.data;
};

