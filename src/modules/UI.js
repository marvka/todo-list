//TODO: Later, make a UI folder and turn sidebar and todo overview into modules, have UI logic in UI.js
import * as Data from "./Data";
import * as EventListeners from "./EventListeners";
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

const loadSidebar = () => {
  const sidebar = document.getElementById("sidebar");

  const sidebarList = document.createElement("ul");
  sidebarList.id = "projects";
  sidebar.appendChild(sidebarList);

  const today = document.createElement("li");
  today.textContent = "Today";
  today.id = "today";
  today.addEventListener("click", EventListeners.loadDueToday);
  sidebarList.appendChild(today);

  addProjectsToSidebar(Data.getProjects());
};

const addProjectsToSidebar = (projectArr) => {
  const sidebarList = document.getElementById("projects");
  projectArr.forEach((project) => {
    const projectElement = document.createElement("li");
    projectElement.textContent = project.getTitle();
    projectElement.classList.add("project");
    projectElement.addEventListener("click", EventListeners.loadProject);
    sidebarList.appendChild(projectElement);
  });
};

export const loadProject = (project) => {
  unloadTodoView();
  const todoViewContainer = document.getElementById("todo-view-container");
  const heading = document.createElement("h2");
  heading.textContent = project.getTitle();
  todoViewContainer.appendChild(heading);

  loadTodos(project.getTodos());
};

const loadTodos = (todos) => {
  const todoViewContainer = document.getElementById("todo-view-container");

  todos.forEach((todo) => {
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo");

    const todoCheckbox = document.createElement("input");
    todoCheckbox.type = "checkbox";
    todoCheckbox.dataset.todoTitle = todo.getTitle();
    todoCheckbox.classList.add("delete-todo");
    todoCheckbox.addEventListener("click", EventListeners.deleteTodo);
    todoContainer.appendChild(todoCheckbox);

    const todoTitle = document.createElement("div");
    todoTitle.textContent = todo.getTitle();
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