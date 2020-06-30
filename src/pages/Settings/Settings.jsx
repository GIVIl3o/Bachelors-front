import React, { useContext } from "react";
import { ProjectContext } from "App";
import DangerZone from "./DangerZone";
import PageLoading from "components/utils/PageLoading";
import ChangeProject from "./ChangeProject";

const About = () => {
  const { project } = useContext(ProjectContext);

  if (!project) return <PageLoading />;

  return (
    <div>
      <ChangeProject />
      <DangerZone />
    </div>
  );
};

export default About;
