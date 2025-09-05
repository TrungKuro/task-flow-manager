import React, { useState } from "react";
import { cn } from "@/lib/utils";

import Modal from "../ui/Modal";
import { formatISO } from "date-fns";

import { useCreateProjectMutation } from "@/redux/slice/api";

/* ------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                              */
/* ------------------------------------------------------------------------- */

type ModalNewProjectProps = {
  isOpen: boolean;
  onClose: () => void;
};

/* ------------------------------------------------------------------------- */

const ModalNewProject = ({ isOpen, onClose }: ModalNewProjectProps) => {
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async () => {
    if (!projectName || !startDate || !endDate) return;

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formattedEndDate = formatISO(new Date(endDate), {
      representation: "complete",
    });

    await createProject({
      name: projectName,
      description,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });
  };

  const isFormValid = () => {
    return projectName && description && startDate && endDate;
  };

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Project">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* --------------------------------------------------------------- */}

        {/* Name Project */}
        <input
          type="text"
          className={inputStyles}
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />

        {/* Description Project */}
        <textarea
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Start Date & End Date */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          {/* Start Date */}
          <input
            type="date"
            className={inputStyles}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          {/* End Date */}
          <input
            type="date"
            className={inputStyles}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* --------------------------------------------------------------- */}

        {/* Button Submit */}
        <button
          type="submit"
          className={cn(
            "focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none",
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : "",
          )}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewProject;
