"use strict";
import * as UI from "./UI";
import * as Data from "./Data";
import * as Forms from "./Forms";
import createProject from "./Project";

export const addToSidebar = () => {
  const today = document.getElementById("today");
  today.addEventListener("click", loadDueToday);

  const projectListItems = document.querySelectorAll(".project");
  projectListItems.forEach((projectListItem) => {
    projectListItem.addEventListener("click", projectLoadEventListener);
  });
};

export const loadNewProjectForm = () => {
  Forms.loadNewProjectForm();
};

export const loadDueToday = () => {
  const tempProject = createProject("Today");
  Data.getTodosDueToday().forEach((todo) => {
    tempProject.addTodo(todo);
  });
  UI.loadProject(tempProject);
};

export const addNewProject = () => {
  if (document.querySelector("div#form-container")) {
    const title = document.getElementById("form-title").value;
    const project = createProject(title);
    Data.addProject(project);
    project.getTodos().forEach((todo) => console.log(todo));
    UI.loadSidebar();
    Forms.clearForm();
  }
};

  }
};

export const clearForm = () => {
  Forms.clearForm();
};

export const loadProject = (event) => {
  const project = Data.findProject(event.target.textContent);
  if (!project) throw "Project not found!";
  UI.loadProject(project);
};

export const deleteTodo = (event) => {
  const title = event.target.dataset.todoTitle;
  const project = Data.findProject(event.target.dataset.project);
  const currentView = event.target.parentNode.parentNode.firstChild.textContent;
  project.deleteTodo(title);
  if (currentView === "Today") {
    loadDueToday();
  } else {
    UI.loadProject(project);
  }
};
