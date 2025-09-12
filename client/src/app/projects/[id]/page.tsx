"use client";

import React, { useState } from "react";

import ProjectHeader from "../ProjectHeader";
import BoardView from "../BoardView";
import ListView from "../ListView";
import TimelineView from "../TimelineView";
import TableView from "../TableView";
import ModalNewTask from "@/components/common/ModalNewTask";

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
      {/* Popup Modal "New Task" */}
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        id={id}
      />

      {/* Header */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Layout view Projects */}
      {activeTab === "Board" && (
        <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "List" && (
        <ListView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Timeline" && (
        <TimelineView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Table" && (
        <TableView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
};

export default ProjectPage;
