"use client";

import { useState } from "react";

export default function ModuleEditor({
  disabled,
  onAddModule,
}: {
  disabled: boolean;
  onAddModule: (name: string) => Promise<boolean>;
}) {
  const [show, setShow] = useState(false);
  const [moduleName, setModuleName] = useState("");

  const [error, setError] = useState("");

  const handleClose = () => {
    if (!disabled) {
      setShow(false);
      setError("");
    }
  };

  const handleAdd = async () => {
    if (disabled) {
      return;
    }

    if (moduleName.trim() === "") {
      setError("Module name is required.");
      return;
    }

    setError("");
    const created = await onAddModule(moduleName.trim());

    if (created) {
      setModuleName("");
      setShow(false);
    } else {
      setError("Unable to create module. Please try again.");
    }
  };

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        id="wd-add-module-btn"
        onClick={() => setShow(true)}
        className="rounded border border-red-600 bg-red-600 px-3 py-1.5 text-sm font-medium text-white"
      >
        + Module
      </button>

      {show && (
        <div
          id="wd-add-module-dialog"
          role="dialog"
          aria-modal="true"
          aria-label="Add Module"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
        >
          <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
            <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
              <h3 className="m-0 text-lg font-semibold">
                Add Module
              </h3>

              <button
                type="button"
                disabled={disabled}
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
                disabled={disabled}
                aria-label="Module name"
                className="w-full rounded border border-neutral-300 px-3 py-1.5"
                value={moduleName}
                onChange={(e) => setModuleName(e.target.value)}
                placeholder="Module name"
              />
            </div>

            {error && (
              <p role="alert" className="px-4 text-sm text-red-600">
                {error}
              </p>
            )}

            <div className="flex justify-end gap-2 border-t border-neutral-200 px-4 py-3">
              <button
                type="button"
                disabled={disabled}
                id="wd-add-module-cancel"
                onClick={handleClose}
                className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={disabled}
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
