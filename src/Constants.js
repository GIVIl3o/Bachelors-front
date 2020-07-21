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
    color: "#87BAC6",
  },
  todo: {
    value: "TODO",
    text: "constants_progress_todo",
    color: "#F4D369",
  },
  doing: {
    value: "DOING",
    text: "constants_progress_doing",
    color: "#87C8BB",
  },
  review: {
    value: "REVIEW",
    text: "constants_progress_review",
    color: "#EF915E",
  },
  qa: { value: "QA", text: "constants_progress_qa", color: "#A4A4EA" },
  closed: {
    value: "CLOSED",
    text: "constants_progress_closed",
    color: "#D6D6D6",
  },
};

// TODO it's probably better to change colors, i took them from PROGRESS....
const LABELS = {
  minor: {
    value: "MINOR",
    text: "constants_labels_minor",
    color: "#5EAAA8",
  },
  major: {
    value: "MAJOR",
    text: "constants_labels_major",
    color: "#F4BA51",
  },
  blocker: {
    value: "BLOCKER",
    text: "constants_labels_blocker",
    color: "#5E5E5E",
  },
  critical: {
    value: "CRITICAL",
    text: "constants_labels_critical",
    color: "#E45745",
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
