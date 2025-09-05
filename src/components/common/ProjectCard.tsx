import React from "react";

import { format } from "date-fns";

import { Project } from "@/redux/slice/api";

/* ------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                              */
/* ------------------------------------------------------------------------- */

type ProjectCardProps = {
  project: Project;
};

/* ------------------------------------------------------------------------- */

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
      <p>
        <strong>Project:</strong> {project.name}
      </p>
      <p>
        <strong>Description:</strong> {project.description}
      </p>
      <p>
        <strong>Start Date:</strong>{" "}
        {project.startDate
          ? format(new Date(project.startDate), "P")
          : "Not set"}
      </p>
      <p>
        <strong>End Date:</strong>{" "}
        {project.endDate ? format(new Date(project.endDate), "P") : "Not set"}
      </p>
    </div>
  );
};

export default ProjectCard;
