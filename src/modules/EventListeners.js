"use strict";
import * as UI from "./UI";
import * as Data from "./Data";
import * as Forms from "./Forms";
import createProject from "./Project";
import createTodo from "./Todo";

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
  const todo = project.findTodo(event.target.parentNode.dataset.todo);
  UI.loadTodoDetails(todoContainer, project, todo);
};

export const editTodoDescription = (event) => {
  const project = Data.findProject(event.target.parentNode.dataset.project);
  const todo = project.findTodo(event.target.parentNode.dataset.todo);
  const descriptionContainer = document.getElementById("description-container");
  descriptionContainer.innerHTML = "";

  const descriptionEditLabel = document.createElement("label");
  descriptionEditLabel.setAttribute("for", "edit-description-textbox");
  const descriptionEditTextbox = document.createElement("input");
  descriptionEditTextbox.id = "edit-description-textbox";
  descriptionEditTextbox.setAttribute("type", "text");
  descriptionEditTextbox.setAttribute("value", todo.getDescription() || "");
  const descriptionSubmitButton = document.createElement("button");
  descriptionSubmitButton.textContent = "Submit";
  descriptionSubmitButton.addEventListener("click", submitNewDescription);

  descriptionContainer.appendChild(descriptionEditLabel);
  descriptionContainer.appendChild(descriptionEditTextbox);
  descriptionContainer.appendChild(descriptionSubmitButton);
};

const submitNewDescription = (event) => {
  const project = Data.findProject(event.target.parentNode.dataset.project);
  const todo = project.findTodo(event.target.parentNode.dataset.todo);
  const descriptionContainer = document.getElementById("description-container");
  const newDescription = document.getElementById(
    "edit-description-textbox"
  ).value;
  todo.setDescription(newDescription);
  descriptionContainer.innerHTML = "";
  UI.loadTodoDetails(descriptionContainer, project, todo);
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
  const title = event.target.parentNode.dataset.todo;
  const project = Data.findProject(event.target.parentNode.dataset.project);
  const currentView = event.target.parentNode.parentNode.firstChild.textContent;
  project.deleteTodo(title);
  if (currentView === "Today") {
    loadDueToday();
  } else {
    UI.loadProject(project);
  }
};
