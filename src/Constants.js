const PERMISSIONS = {
  developer: { value: "DEVELOPER", text: "constants_permissions_developer" },
  owner: {
    value: "PRODUCT_OWNER",
    text: "constants_permissions_product_owner",
  },
  master: { value: "SCRUM_MASTER", text: "constants_permissions_scrum_master" },
  admin: { value: "ADMIN", text: "constants_permissions_admin" },
};

const PROGRESS = {
  planned: {
    value: "PLANNED",
    text: "constants_progress_planned",
    color: "rgb(142, 68, 173)",
  },
  todo: {
    value: "TODO",
    text: "constants_progress_todo",
    color: "rgb(240, 173, 78)",
  },
  doing: {
    value: "DOING",
    text: "constants_progress_doing",
    color: "rgb(92, 184, 92)",
  },
  review: {
    value: "REVIEW",
    text: "constants_progress_review",
    color: "rgb(105, 209, 0)",
  },
  qa: { value: "QA", text: "constants_progress_qa", color: "rgb(209, 0, 105)" },
  closed: {
    value: "CLOSED",
    text: "constants_progress_closed",
    color: "rgba(255, 0, 0, 0.3)",
  },
};

// TODO it's probably better to change colors, i took them from PROGRESS....
const LABELS = {
  minor: {
    value: "MINOR",
    text: "constants_labels_minor",
    color: "rgb(105, 209, 0)",
  },
  major: {
    value: "MAJOR",
    text: "constants_labels_major",
    color: "rgb(240, 173, 78)",
  },
  blocker: {
    value: "BLOCKER",
    text: "constants_labels_blocker",
    color: "rgb(142, 68, 173",
  },
  critical: {
    value: "CRITICAL",
    text: "constants_labels_critical",
    color: "rgb(209, 0, 105)",
  },
};

const TASK_TYPE = {
  bug: {
    value: "BUG",
    text: "task_card_bug",
  },
  story: {
    value: "STORY",
    text: "task_card_story",
  },
};

const getLabelValue = (value) => {
  return Object.keys(LABELS)
    .map((t) => LABELS[t])
    .find((label) => label.value === value);
};

const getTaskTypeValue = (value) => {
  return Object.keys(TASK_TYPE)
    .map((t) => TASK_TYPE[t])
    .find((label) => label.value === value);
};

const getPermission = (permission_enum) => {
  return Object.keys(PERMISSIONS)
    .map((t) => PERMISSIONS[t])
    .find((permission) => permission.value === permission_enum);
};

const permissionIsAtLeast = (myPermission, requiredPermission) => {
  if (requiredPermission === PERMISSIONS.developer.value) return true;

  if (
    requiredPermission === PERMISSIONS.owner.value &&
    !myPermission.value === PERMISSIONS.developer.value
  )
    return true;

  if (
    requiredPermission === PERMISSIONS.master.value &&
    myPermission.value !== PERMISSIONS.developer.value &&
    myPermission.value !== PERMISSIONS.owner.value
  )
    return true;

  return myPermission.value === PERMISSIONS.admin.value;
};

export {
  PERMISSIONS,
  PROGRESS,
  LABELS,
  TASK_TYPE,
  getLabelValue,
  getTaskTypeValue,
  getPermission,
  permissionIsAtLeast,
};
