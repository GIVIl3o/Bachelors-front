import React, { useEffect, useContext } from "react";
import { UserContext, ProjectContext } from "App";
import DangerZone from "./DangerZone";
import axios from "axios";
import { parseISO } from "date-fns";
import { MessageContext, MessageTypes } from "components/utils/Messages";
import { useHistory } from "react-router";
import PageLoading from "components/utils/PageLoading";
import ChangeProject from "./ChangeProject";

import {} from "./styles.module.css";

const About = ({ match }) => {
  const { textLang } = useContext(UserContext);

  const projectId = match.params.id;

  const setMessage = useContext(MessageContext);
  const { project, setProject } = useContext(ProjectContext);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`/projects/${projectId}`)
      .then((response) => {
        const project = response.data;

        document.title = `Scrumhub | ${project.title}`;
        const epics = project.epics.map((epic) => ({
          ...epic,
          fromDate: parseISO(epic.fromDate),
          toDate: parseISO(epic.toDate),
        }));

        setProject({ ...project, epics });
      })
      .catch(() => {
        setMessage(textLang.project_not_found, MessageTypes.error);
        history.push("/");
      });
  }, [projectId]);

  if (!project || projectId != project.id) return <PageLoading />;

  return (
    <div>
      <ChangeProject />
      <DangerZone />
    </div>
  );
};

export default About;
