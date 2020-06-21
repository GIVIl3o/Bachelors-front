const PERMISSIONS = {
  member: { value: "MEMBER", text: "constants_permissions_member" },
  admin: { value: "ADMIN", text: "constants_permissions_admin" },
  owner: { value: "OWNER", text: "constants_permissions_owner" },
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

const getLabelValue = (value) => {
  return Object.keys(LABELS)
    .map((t) => LABELS[t])
    .filter((label) => label.value === value)[0];
};

export { PERMISSIONS, PROGRESS, LABELS, getLabelValue };
