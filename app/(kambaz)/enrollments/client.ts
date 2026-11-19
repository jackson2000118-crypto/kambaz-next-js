import axios from "axios";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const USERS_API = `${HTTP_SERVER}/api/users`;

export const enrollIntoCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/current/courses/${encodeURIComponent(courseId)}`
  );

  return response.data;
};

export const unenrollFromCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.delete(
    `${USERS_API}/current/courses/${encodeURIComponent(courseId)}`
  );

  return response.data;
};