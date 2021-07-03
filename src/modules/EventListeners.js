"use strict";
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

export const loadDueToday = () => {
  const tempProject = createProject("Today");
  getTodosDueToday().forEach((todo) => {
    tempProject.addTodo(todo);
  });
  UI.loadProject(tempProject);
};

export const loadProject = (event) => {
  const project = findProject(event.target.textContent);
  if (!project) throw "Project not found!";
  UI.loadProject(project);
};

export const deleteTodo = (event) => {
  const title = event.target.dataset.todoTitle;
  const project = findProject(event.target.dataset.project);
  const currentView = event.target.parentNode.parentNode.firstChild.textContent;
  project.deleteTodo(title);
  if (currentView === "Today") {
    loadDueToday();
  } else {
    UI.loadProject(project);
  }
};
