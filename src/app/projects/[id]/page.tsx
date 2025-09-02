"use client";

import React, { useState } from "react";
import ProjectHeader from "../ProjectHeader";

/* ------------------------------------------------------------------------- */
/*                        URL (Path) "/projects/[id]"                        */
/* ------------------------------------------------------------------------- */

type Props = {
  params: { id: string };
};

/* ------------------------------------------------------------------------- */

const ProjectPage = ({ params }: Props) => {
  const { id } = params;
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />;
};

export default ProjectPage;
