import * as UI from "./UI";
import { findProject, getTodosDueToday } from "./Data";
import createProject from "./Project";

export const addToSidebar = () => {
  const today = document.getElementById("today");
  today.addEventListener("click", loadDueToday);

  const projectListItems = document.querySelectorAll(".project");
  projectListItems.forEach((projectListItem) => {
    projectListItem.addEventListener("click", projectLoadEventListener);
  });
};

export const loadDueToday = (event) => {
  const tempProject = createProject("Due Today");
  getTodosDueToday().forEach((todo) => tempProject.addTodo(todo));
  UI.loadProject(tempProject);
};

export const loadProject = (event) => {
  const project = findProject(event.target.textContent);
  if (!project) throw "Project not found!";
  UI.loadProject(project);
};

};
