"use strict";
import * as UI from "./UI";
import * as Data from "./Data";
import * as Forms from "./Forms";
import createProject from "./Project";
import createTodo from "./Todo";
import { insertAfter } from "./Helper";

export const addToSidebar = () => {
  const today = document.getElementById("today");
  today.addEventListener("click", loadDueToday);

  const projectListItems = document.querySelectorAll(".project");
  projectListItems.forEach((projectListItem) => {
    projectListItem.addEventListener("click", projectLoadEventListener);
  });
};

export const loadNewProjectForm = () => {
  Forms.clearForm();
  Forms.loadNewProjectForm();
};

export const loadNewTodoForm = (event) => {
  Forms.clearForm();
  Forms.loadNewTodoForm();
};

export const loadDueToday = () => {
  const tempProject = createProject("Today");
  Data.getTodosDueToday().forEach((todo) => {
    tempProject.addTodo(todo);
  });
  UI.loadProject(tempProject);
};

export const addNewProject = () => {
  if (document.querySelector("div.form-container")) {
    const title = document.getElementById("form-title").value;
    const project = createProject(title);
    Data.addProject(project);
    UI.loadSidebar();
    Forms.clearForm();
  }
};

export const addTodo = (event) => {
  if (document.querySelector("div#form-add-todo")) {
    const project = Data.findProject(
      document.querySelector("#active-project-title").textContent
    );
    const title = document.querySelector("input#form-title").value;
    const dueDate = document.querySelector("input#form-dueDate").valueAsDate;
    const description = document.querySelector("input#form-description").value;
    const priority = document.querySelector("select#priority-select").value;
    const newTodo = createTodo(title, dueDate, description, priority);
    newTodo.linkToProject(project);
    project.addTodo(newTodo);
    UI.loadProject(project);
    Forms.clearForm();
  }
};

export const loadTodoDetails = (event) => {
  const project = Data.findProject(event.target.parentNode.dataset.project);
  const todoContainer = event.target.parentNode;
  const todo = project.findTodo(event.target.parentNode.dataset.todoTitle);

  const detailDiv = document.createElement("div");
  const descriptionContainer = document.createElement("div");
  descriptionContainer.classList = "description-container";
  const descriptionEditButton = document.createElement("button");
  descriptionEditButton.textContent = "Edit";
  descriptionEditButton.addEventListener("click", editTodoDescription);
  const descriptionDiv = document.createElement("div");
  descriptionDiv.textContent = todo.getDescription() || "No Description";

  insertAfter(todoContainer, detailDiv);
  detailDiv.appendChild(descriptionContainer);
  descriptionContainer.appendChild(descriptionEditButton);
  descriptionContainer.appendChild(descriptionDiv);
};

export const editTodoDescription = (event) => {
  //TODO: Implement description editing
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
  const title = event.target.parentNode.dataset.todoTitle;
  const project = Data.findProject(event.target.parentNode.dataset.project);
  const currentView = event.target.parentNode.parentNode.firstChild.textContent;
  project.deleteTodo(title);
  if (currentView === "Today") {
    loadDueToday();
  } else {
    UI.loadProject(project);
  }
};
