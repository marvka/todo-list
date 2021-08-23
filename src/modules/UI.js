"use strict";
//TODO: Later, make a UI folder and turn sidebar and todo overview into modules, have UI logic in UI.js
import * as Data from "./Data";
import * as EventListeners from "./EventListeners";
import formatISO from "date-fns/formatISO";
import descriptionEditSvg from "../assets/edit-regular.svg";

const body = document.querySelector("body");

export const initialize = () => {
  loadLayout();
  loadHeader();
  loadSidebar();
  loadProject(Data.findProject("Inbox"));
};

const loadLayout = () => {
  const header = document.createElement("header");
  body.appendChild(header);

  const sidebar = document.createElement("nav");
  sidebar.id = "sidebar";
  body.appendChild(sidebar);

  const todoViewContainer = document.createElement("div");
  todoViewContainer.id = "todo-view-container";
  body.appendChild(todoViewContainer);
};

const loadHeader = () => {
  const header = document.querySelector("header");

  const title = document.createElement("h1");
  title.textContent = "ToDoers";
  header.appendChild(title);
};

export const loadSidebar = () => {
  clearSideBar();
  const sidebar = document.getElementById("sidebar");

  const sidebarList = document.createElement("ul");
  sidebarList.id = "projects";
  sidebar.appendChild(sidebarList);

  const today = document.createElement("li");
  today.id = "today";
  today.textContent = "Today";
  today.addEventListener("click", EventListeners.loadTodosDueToday);
  sidebarList.appendChild(today);

  Data.getProjects().forEach((project) => {
    const projectElement = document.createElement("li");
    projectElement.textContent = project.getTitle();
    projectElement.id = project.getTitle();
    projectElement.classList.add("project");
    projectElement.addEventListener("click", EventListeners.loadProject);
    sidebarList.appendChild(projectElement);
  });

  const inbox = document.querySelector("#Inbox");
  today.before(inbox);

  const addProject = document.createElement("li");
  addProject.textContent = "+ Project";
  addProject.id = "add-project";
  addProject.addEventListener("click", EventListeners.loadNewProjectForm);
  sidebarList.appendChild(addProject);
};

export const clearSideBar = () => {
  const sidebar = document.getElementById("sidebar");
  if (sidebar) {
    sidebar.innerHTML = "";
  }
};

export const loadProject = (project) => {
  const todoViewContainer = document.getElementById("todo-view-container");

  unloadTodoView();
  loadHeading(project.getTitle());
  loadTodos(project.getTitle(), project.getTodos());
  if (project.getTitle() != "Today") {
    const newTodoButton = document.createElement("button");
    newTodoButton.textContent = "+ Todo";
    newTodoButton.addEventListener("click", EventListeners.loadNewTodoForm);
    todoViewContainer.appendChild(newTodoButton);
  }
};

export const loadHeading = (title) => {
  const todoViewContainer = document.getElementById("todo-view-container");
  const heading = document.createElement("h2");
  heading.textContent = title;
  heading.id = "active-project-title";
  todoViewContainer.appendChild(heading);
};

export const loadTodosDueToday = (projectsWithTodosDueToday) => {
  unloadTodoView();
  loadHeading("Today");
  projectsWithTodosDueToday.forEach((project) => {
    const todos = project.getTodos().filter((todo) => todo.isDueToday());
    loadTodos(project.getTitle(), todos);
  });
};

const loadTodos = (projectTitle, todos) => {
  const todoViewContainer = document.getElementById("todo-view-container");

  todos.forEach((todo) => {
    const todoContainer = loadTodo(projectTitle, todo);
    todoViewContainer.appendChild(todoContainer);
  });
};

const loadTodo = (projectTitle, todo) => {
  const todoTitle = todo.getTitle();

  const todoContainer = document.createElement("div");
  todoContainer.classList.add("todo");
  todoContainer.dataset.todo = todoTitle;
  todoContainer.dataset.project = projectTitle;

  const todoCheckbox = document.createElement("input");
  todoCheckbox.type = "checkbox";
  todoCheckbox.classList.add("delete-todo");
  todoCheckbox.addEventListener("click", EventListeners.deleteTodo);
  todoContainer.appendChild(todoCheckbox);

  const todoTitleDiv = document.createElement("div");
  todoTitleDiv.textContent = todoTitle;
  todoTitleDiv.addEventListener("click", EventListeners.loadTodoDescription);
  todoContainer.appendChild(todoTitleDiv);

  const todoDueDate = document.createElement("div");
  todoDueDate.classList.add("due-date");
  todoDueDate.textContent = formatISO(todo.getDueDate(), {
    representation: "date",
  });
  todoDueDate.addEventListener("click", EventListeners.editDueDate);
  todoContainer.appendChild(todoDueDate);

  return todoContainer;
};

const unloadTodoView = () => {
  const todoViewContainer = document.getElementById("todo-view-container");
  if (todoViewContainer) todoViewContainer.innerHTML = "";
};

export const loadTodoDetails = (todoContainer, project, todo) => {
  const detailDiv = document.createElement("div");
  const descriptionContainer =
    document.getElementById("description-container") ||
    document.createElement("div");
  if (descriptionContainer.hasChildNodes()) {
    descriptionContainer.innerHTML = "";
  }
  descriptionContainer.id = "description-container";
  descriptionContainer.dataset.project = project.getTitle();
  descriptionContainer.dataset.todo = todo.getTitle();
  const descriptionEditButton = new Image();
  descriptionEditButton.classList.add("description-edit-button");
  descriptionEditButton.src = descriptionEditSvg;
  descriptionEditButton.addEventListener(
    "click",
    EventListeners.editTodoDescription
  );

  const descriptionDiv = document.createElement("div");
  descriptionDiv.textContent = todo.getDescription() || "No Description";

  todoContainer.after(detailDiv);
  detailDiv.appendChild(descriptionContainer);
  descriptionContainer.appendChild(descriptionEditButton);
  descriptionContainer.appendChild(descriptionDiv);
};

export const reloadTodo = (todoContainer, projectTitle, todo) => {
  const newTodoContainer = loadTodo(projectTitle, todo);
  todoContainer.replaceWith(newTodoContainer);
};
