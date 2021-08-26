"use strict";
import * as UI from "./UI";
import * as Data from "./Data";
import * as Forms from "./Forms";
import createProject from "./Project";
import createTodo from "./Todo";
import parseISO from "date-fns/parseISO";

export const loadNewProjectForm = () => {
  Forms.clearForm();
  Forms.loadNewProjectForm();
};

export const loadNewTodoForm = (event) => {
  Forms.clearForm();
  Forms.loadNewTodoForm();
};

export const loadTodosDueToday = () => {
  const projectsWithTodosDueToday = Data.getProjects().filter(
    (project) => project.getTodosDueToday().length > 0
  );
  UI.loadTodosDueToday(projectsWithTodosDueToday);
};

export const addNewProject = () => {
  if (document.querySelector("div.form-container")) {
    const title = document.getElementById("form-title").value;
    const project = createProject(title);
    Data.addProject(project);
    Data.storeDataInLocalStorage();
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
    project.addTodo(newTodo);
    Data.storeDataInLocalStorage();
    UI.loadProject(project);
    Forms.clearForm();
  }
};

export const toggleTodoDescription = (event) => {
  const button = event.target;
  const project = Data.findProject(event.target.parentNode.dataset.project);
  const todoContainer = event.target.parentNode;
  const todo = project.findTodo(event.target.parentNode.dataset.todo);

  if (document.querySelector("#description-container")) {
    UI.unloadTodoDescription();
    button.textContent = "+";
  } else {
    UI.loadTodoDescription(todoContainer, project, todo);
    button.textContent = "-";
  }
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

export const editDueDate = (event) => {
  if (document.querySelector("#change-due-date")) {
    const todoDivWithOpenCalendar =
      document.querySelector("#change-due-date").parentNode;
    const projectTitle = todoDivWithOpenCalendar.dataset.project;
    const project = Data.findProject(projectTitle);
    const todo = project.findTodo(todoDivWithOpenCalendar.dataset.todo);
    UI.reloadTodo(todoDivWithOpenCalendar, projectTitle, todo);
  }

  const todoContainer = event.target.parentNode;
  const todoDueDateDiv = event.target;

  const calendar = document.createElement("input");
  calendar.setAttribute("type", "date");
  calendar.id = "change-due-date";
  calendar.value = todoDueDateDiv.textContent;

  const submitButton = document.createElement("button");
  submitButton.id = "submit-due-date";
  submitButton.textContent = "Submit";
  submitButton.addEventListener("click", submitNewDueDate);

  todoDueDateDiv.remove();
  todoContainer.appendChild(calendar);
  todoContainer.appendChild(submitButton);
};

const submitNewDueDate = (event) => {
  const calendar = document.querySelector("#change-due-date");
  const newDueDate = parseISO(calendar.value);
  const projectTitle = event.target.parentNode.dataset.project;
  const project = Data.findProject(projectTitle);
  const todo = project.findTodo(event.target.parentNode.dataset.todo);
  todo.setDueDate(newDueDate);
  UI.reloadTodo(event.target.parentNode, projectTitle, todo);
};

const submitNewDescription = (event) => {
  const project = Data.findProject(event.target.parentNode.dataset.project);
  const todo = project.findTodo(event.target.parentNode.dataset.todo);
  const descriptionContainer = document.getElementById("description-container");
  const newDescription = document.getElementById(
    "edit-description-textbox"
  ).value;
  todo.setDescription(newDescription);
  Data.storeDataInLocalStorage();
  descriptionContainer.innerHTML = "";
  UI.loadTodoDescription(descriptionContainer, project, todo);
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
    loadTodosDueToday();
  } else {
    UI.loadProject(project);
  }
};
