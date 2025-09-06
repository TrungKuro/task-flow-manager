import React from "react";

import ReusablePriorityPage from "../reusablePriorityPage";
import { Priority } from "@/redux/slice/api";

const Urgent = () => {
  return <ReusablePriorityPage priority={Priority.Backlog} />;
};

export default Urgent;
