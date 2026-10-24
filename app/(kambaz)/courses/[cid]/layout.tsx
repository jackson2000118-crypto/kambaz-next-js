import type { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import { courses } from "../../database";
import Breadcrumb from "./Breadcrumb";

export default async function CoursesLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ cid: string }>;
}>) {
  const { cid } = await params;
  const course = courses.find((c) => c._id === cid);

  return (
    <div id="wd-courses">
      <h2 className="text-2xl font-semibold text-red-600">
        <Breadcrumb course={course} />

        {/* With AI */}
        <span className="ms-2 text-sm">({course?._id})</span>
      </h2>
      <hr />

      <div className="flex gap-4">
        <div className="hidden w-[140px] shrink-0 md:block">
          <CourseNavigation cid={cid} />
        </div>

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}