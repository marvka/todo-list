import { loadDueToday, loadProject } from "./UI";
import { findProject } from "./Data";

export const loadSidebarEventlisteners = () => {
  const today = document.getElementById("today");
  today.addEventListener("click", loadDueToday);

  const projectListItems = document.querySelectorAll(".project");
  projectListItems.forEach((projectListItem) => {
    projectListItem.addEventListener("click", projectEventListener);
  });
};

export const projectEventListener = (event) => {
  const project = findProject(event.target.textContent);
  if (!project) throw "Project not found!";
  loadProject(project);
};
