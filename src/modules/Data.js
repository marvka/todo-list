import { wipeObj } from "./Helper";

const inbox = {}; // Inbox "project"
const projects = []; // User defined projects

export const setInbox = (project) => {
  Object.assign(inbox, project);
};

export const addProject = (project) => {
  projects.push(project);
};

export const getProjects = () => {
  return projects;
};

export const getInboxTodos = () => {
  return inbox.getTodos();
};

export const isEmpty = () => {
  if (!projects.length && !inbox.getTodos().length) return true;
};

export const findProject = (title) => {
  return projects.find((project) => project.getTitle() === title) ||
    inbox.getTitle() === title
    ? inbox
    : null;
};

export const storeInLocalStorage = () => {
  localStorage.setItem("inbox", JSON.stringify(inbox));
  localStorage.setItem("projects", JSON.stringify(projects));
};

export const retrieveFromLocalStorage = () => {
  if (JSON.parse(localStorage.getItem("projects"))) {
    projects.length = 0;
    JSON.parse(localStorage.getItem("projects")).forEach((project) =>
      projects.push(project)
    );
  }
  if (JSON.parse(localStorage.getItem("inbox"))) {
    wipeObj(inbox);
    setInbox(inbox, JSON.parse(localStorage.getItem("inbox")));
  }
};

export const getTodosDueToday = () => {
  const dueToday = [];
  projects.forEach((project) => {
    dueToday.push(project.getTodosDueToday());
  });
  inbox.getTodosDueToday().forEach((todo) => dueToday.push(todo));
  return dueToday;
};
