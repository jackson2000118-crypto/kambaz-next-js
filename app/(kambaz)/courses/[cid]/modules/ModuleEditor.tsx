"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useModulesStore } from "../../../store/modulesStore";

export default function ModuleEditor() {
  const { cid } = useParams();
  const courseId = typeof cid === "string" ? cid : "";

  const [show, setShow] = useState(false);
  const [moduleName, setModuleName] = useState("");

  const addModule = useModulesStore((state) => state.addModule);

  const handleClose = () => setShow(false);

  const handleAdd = () => {
    // With AI：空白或只有空格時，不新增，也不關閉對話框。
    if (moduleName.trim() === "") return;

    addModule({
      name: moduleName,
      course: courseId,
    });

    setModuleName("");
    handleClose();
  };

  return (
    <>
      <button
        type="button"
        id="wd-add-module-btn"
        onClick={() => setShow(true)}
        className="rounded border border-red-600 bg-red-600 px-3 py-1.5 text-sm font-medium text-white"
      >
        + Module
      </button>

      {show && (
        <div
          id="wd-add-module-dialog"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
        >
          <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
            <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
              <h3 className="m-0 text-lg font-semibold">
                Add Module
              </h3>

              <button
                type="button"
                onClick={handleClose}
                className="text-2xl leading-none text-neutral-500"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="px-4 py-3">
              <input
                id="wd-add-module-name"
                className="w-full rounded border border-neutral-300 px-3 py-1.5"
                value={moduleName}
                onChange={(e) => setModuleName(e.target.value)}
                placeholder="Module name"
              />
            </div>

            <div className="flex justify-end gap-2 border-t border-neutral-200 px-4 py-3">
              <button
                type="button"
                id="wd-add-module-cancel"
                onClick={handleClose}
                className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm"
              >
                Cancel
              </button>

              <button
                type="button"
                id="wd-add-module-submit"
                onClick={handleAdd}
                className="rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white"
              >
                Add Module
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}