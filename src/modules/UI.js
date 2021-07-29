"use strict";
//TODO: Later, make a UI folder and turn sidebar and todo overview into modules, have UI logic in UI.js
import * as Data from "./Data";
import * as EventListeners from "./EventListeners";
import * as Forms from "./Forms.js";
import formatISO from "date-fns/formatISO";

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

  const inbox = document.createElement("li");
  inbox.id = "inbox";
  inbox.textContent = "Inbox";
  inbox.addEventListener("click", EventListeners.loadProject);
  sidebarList.appendChild(inbox);

  const today = document.createElement("li");
  today.id = "today";
  today.textContent = "Today";
  today.addEventListener("click", EventListeners.loadDueToday);
  sidebarList.appendChild(today);

  Data.getProjects().forEach((project) => {
    const projectElement = document.createElement("li");
    projectElement.textContent = project.getTitle();
    projectElement.classList.add("project");
    projectElement.addEventListener("click", EventListeners.loadProject);
    sidebarList.appendChild(projectElement);
  });

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
  unloadTodoView();
  const todoViewContainer = document.getElementById("todo-view-container");
  const heading = document.createElement("h2");
  heading.textContent = project.getTitle();
  heading.id = "active-project-title";
  todoViewContainer.appendChild(heading);

  loadTodos(project);
  if (project.getTitle() != "Today") {
    const newTodoButton = document.createElement("button");
    newTodoButton.textContent = "+ Todo";
    newTodoButton.addEventListener("click", EventListeners.loadNewTodoForm);
    todoViewContainer.appendChild(newTodoButton);
  }
};

const loadTodos = (project) => {
  const todoViewContainer = document.getElementById("todo-view-container");
  const todos = project.getTodos();

  todos.forEach((todo) => {
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo");
    todoContainer.dataset.project = todo.getLinkedProject().getTitle();
    todoContainer.dataset.todoTitle = todo.getTitle();

    const todoCheckbox = document.createElement("input");
    todoCheckbox.type = "checkbox";
    todoCheckbox.classList.add("delete-todo");
    todoCheckbox.addEventListener("click", EventListeners.deleteTodo);
    todoContainer.appendChild(todoCheckbox);

    const todoTitle = document.createElement("div");
    todoTitle.textContent = todo.getTitle();
    todoTitle.addEventListener("click", EventListeners.loadTodoDetails);
    todoContainer.appendChild(todoTitle);

    const todoDueDate = document.createElement("div");
    todoDueDate.classList.add("due-date");
    todoDueDate.textContent = formatISO(todo.getDueDate(), {
      representation: "date",
    });
    todoContainer.appendChild(todoDueDate);

    todoViewContainer.appendChild(todoContainer);
  });
};

const unloadTodoView = () => {
  const todoViewContainer = document.getElementById("todo-view-container");
  if (todoViewContainer) todoViewContainer.innerHTML = "";
};
