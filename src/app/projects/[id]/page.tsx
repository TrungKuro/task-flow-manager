"use client";

import React, { useState } from "react";

import ProjectHeader from "../ProjectHeader";
import BoardView from "../BoardView";

/* ------------------------------------------------------------------------- */
/*                        URL (Path) "/projects/[id]"                        */
/* ------------------------------------------------------------------------- */

type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

/* ------------------------------------------------------------------------- */

const ProjectPage = ({ params }: ProjectPageProps) => {
  const { id } = React.use(params);

  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div>
      {/* Header */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Layout view Projects */}
      {activeTab === "Board" && (
        <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
};

export default ProjectPage;
