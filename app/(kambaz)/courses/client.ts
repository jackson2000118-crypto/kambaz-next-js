import axios from "axios";
import type { Course } from "../store/coursesStore";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
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
