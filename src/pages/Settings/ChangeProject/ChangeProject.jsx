import React, { useState, useContext } from "react";
import { UserContext, ProjectContext } from "App";
import axios from "axios";
import ChangeProjectTitle from "./ChangeProjectTitle";
import { permissionIsAtLeast, PERMISSIONS } from "Constants";
import ProjectAdmin from "./ProjectAdmin/ProjectAdmin";

import { gridWrapper, wrapper } from "./styles.module.css";
import ProjectScrumMasters from "./ProjectScrumMasters";
import ChangeMember from "./ChangeMember";
import ProjectProductOwner from "./ProjectProductOwner";
import ProjectDevelopers from "./ProjectDevelopers";
import YourPermission from "./YourPermission";
import ChangeProjectDescription from "./ChangeProjectDescription";

const ChangeProject = () => {
  const { project, permission, setProject } = useContext(ProjectContext);
  const { text } = useContext(UserContext);

  const updateProject = (project) => {
    const { tasks, epics, sprints, ...toSend } = project;
    axios.post(`/projects/${project.id}`, toSend);
    setProject(project);
  };

  const [openChangeMembers, setOpenChangeMembers] = useState(false);
  const [changeMembersIcon, setChangeMembersIcon] = useState(true);
  const [changeMemberState, setChangeMemberState] = useState({ new: true });

  const openChangeMembersDialog = (openDialog) => {
    if (openDialog) {
      setChangeMembersIcon(false);
      setOpenChangeMembers(true);
    } else {
      setTimeout(() => {
        setChangeMembersIcon(true);
      }, 300);
      setOpenChangeMembers(false);
    }
  };

  const editUsername = (username) => {
    const permission = project.members.find((t) => t.username === username)
      .permission;

    setChangeMemberState({ new: false, username, permission });
    openChangeMembersDialog(true);
  };

  const isAdmin = permissionIsAtLeast(permission, PERMISSIONS.admin.value);

  return (
    <div className={wrapper}>
      <div>
        <ChangeProjectTitle
          project={project}
          editable={isAdmin}
          updateProject={updateProject}
          showChangeIcon={isAdmin && changeMembersIcon}
          onMemberChangeClick={() => {
            openChangeMembersDialog(true);
            setChangeMemberState({ new: false });
          }}
        />
        <div className={gridWrapper}>
          <ProjectAdmin project={project} />
          <ProjectScrumMasters
            project={project}
            editable={isAdmin}
            updateProject={updateProject}
            editUsername={editUsername}
          />
          <ProjectProductOwner
            project={project}
            editable={isAdmin}
            updateProject={updateProject}
            editUsername={editUsername}
          />
          <ProjectDevelopers
            project={project}
            editable={isAdmin}
            canAddDevelopers={permissionIsAtLeast(
              permission,
              PERMISSIONS.owner.value
            )}
            updateProject={updateProject}
            editUsername={editUsername}
            addMember={() => {
              setChangeMemberState({ new: true });
              openChangeMembersDialog(true);
            }}
          />
          <YourPermission project={project} />
        </div>
        <ChangeProjectDescription
          project={project}
          editable={isAdmin}
          updateProject={updateProject}
          showChangeIcon={isAdmin && changeMembersIcon}
          onMemberChangeClick={() => {
            openChangeMembersDialog(true);
            setChangeMemberState({ new: false });
          }}
        />
      </div>

      <ChangeMember
        open={openChangeMembers}
        setOpen={openChangeMembersDialog}
        state={changeMemberState}
      />
    </div>
  );
};

export default ChangeProject;
