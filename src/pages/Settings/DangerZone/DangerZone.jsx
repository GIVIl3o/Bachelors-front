import React, { useContext } from "react";
import { UserContext, ProjectContext } from "App";

import { wrapper, dangerText, dangerWrapper } from "./styles.module.css";
import { PERMISSIONS } from "Constants";
import DangerZoneAdmin from "./DangerZoneAdmin";
import DangerZoneOthers from "./DangerZoneOthers";

const DangerZone = () => {
  const { text } = useContext(UserContext);

  const { permission } = useContext(ProjectContext);

  return (
    <div className={wrapper}>
      <span className={dangerText}>{text.settings_danger}</span>

      <div className={dangerWrapper}>
        {permission.value === PERMISSIONS.admin.value ? (
          <DangerZoneAdmin />
        ) : (
          <DangerZoneOthers />
        )}
      </div>
    </div>
  );
};

export default DangerZone;
