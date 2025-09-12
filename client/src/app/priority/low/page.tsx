import React from "react";

import ReusablePriorityPage from "../reusablePriorityPage";
import { Priority } from "@/redux/slice/api";

const Urgent = () => {
  return <ReusablePriorityPage priority={Priority.Low} />;
};

export default Urgent;
