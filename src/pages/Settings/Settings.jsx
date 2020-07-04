import React, { useContext } from "react";
import { ProjectContext } from "App";
import DangerZone from "./DangerZone";
import PageLoading from "components/utils/PageLoading";
import ChangeProject from "./ChangeProject";

import { wrapper } from "./styles.module.css";

const About = () => {
  const { project } = useContext(ProjectContext);

  if (!project) return <PageLoading />;

  return (
    <div className={wrapper}>
      <ChangeProject />
      <DangerZone />
    </div>
  );
};

export default About;
