"use strict";
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
  loadProjectForm();
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
  sidebar.appendChild(addProject);
};

export const loadProject = (project) => {
  unloadTodoView();
  const todoViewContainer = document.getElementById("todo-view-container");
  const heading = document.createElement("h2");
  heading.textContent = project.getTitle();
  todoViewContainer.appendChild(heading);

  loadTodos(project);
};

export const loadProjectForm = () => {
  const projectForm = document.createElement("div");
  projectForm.id = "form-add-project";
  body.appendChild(projectForm);

  const titleContainer = document.createElement("div");
  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Title";
  titleLabel.setAttribute("for", "form-title");
  titleContainer.appendChild(titleLabel);
  const titleInput = document.createElement("input");
  titleInput.setAttribute("type", "text");
  titleInput.id = "form-title";
  titleContainer.appendChild(titleInput);
  projectForm.appendChild(titleContainer);

  const descriptionContainer = document.createElement("div");
  const descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Description (optional)";
  descriptionLabel.setAttribute("for", "form-description");
  descriptionContainer.appendChild(descriptionLabel);
  const descriptionInput = document.createElement("input");
  descriptionInput.setAttribute("type", "text");
  descriptionInput.id = "form-description";
  descriptionContainer.appendChild(descriptionInput);
  projectForm.appendChild(descriptionContainer);

  const dueDateContainer = document.createElement("div");
  const dueDateLabel = document.createElement("label");
  dueDateLabel.textContent = "Due Date";
  dueDateLabel.setAttribute("for", "form-dueDate");
  dueDateContainer.appendChild(dueDateLabel);
  const dueDateInput = document.createElement("input");
  dueDateInput.setAttribute("type", "date");
  dueDateInput.id = "form-dueDate";
  dueDateContainer.appendChild(dueDateInput);
  projectForm.appendChild(dueDateContainer);

  const priorityContainer = document.createElement("div");
  const priority1Label = document.createElement("label");
  priority1Label.textContent = "Priority 1";
  priorityContainer.appendChild(priority1Label);
  const priority1Radio = document.createElement("input");
  priority1Radio.setAttribute("type", "radio");
  priority1Radio.setAttribute("value", "1");
  priority1Radio.name = "priority";
  priorityContainer.appendChild(priority1Radio);
  const priority2Label = document.createElement("label");
  priority2Label.textContent = "Priority 2";
  priorityContainer.appendChild(priority2Label);
  const priority2Radio = document.createElement("input");
  priority2Radio.setAttribute("type", "radio");
  priority2Radio.setAttribute("value", "2");
  priority2Radio.name = "priority";
  priorityContainer.appendChild(priority2Radio);
  const priority3Label = document.createElement("label");
  priority3Label.textContent = "Priority 3";
  priorityContainer.appendChild(priority3Label);
  const priority3Radio = document.createElement("input");
  priority3Radio.setAttribute("type", "radio");
  priority3Radio.setAttribute("value", "3");
  priority3Radio.name = "priority";
  priorityContainer.appendChild(priority3Radio);
  const priority4Label = document.createElement("label");
  priority4Label.textContent = "Priority 4";
  priorityContainer.appendChild(priority4Label);
  const priority4Radio = document.createElement("input");
  priority4Radio.setAttribute("type", "radio");
  priority4Radio.setAttribute("value", "4");
  priority4Radio.name = "priority";
  priorityContainer.appendChild(priority4Radio);
  projectForm.appendChild(priorityContainer);

  const noteContainer = document.createElement("div");
  const noteLabel = document.createElement("label");
  noteLabel.setAttribute("for", "form-note");
  noteLabel.textContent = "Note (optional)";
  noteContainer.appendChild(noteLabel);
  const noteTextArea = document.createElement("textarea");
  noteTextArea.id = "form-note";
  noteContainer.appendChild(noteTextArea);
  projectForm.appendChild(noteContainer);

  const addButton = document.createElement("button");
  addButton.id = "form-add-project";
  addButton.textContent = "Add";
  projectForm.appendChild(addButton);

  const cancelButton = document.createElement("button");
  cancelButton.id = "form-cancel";
  cancelButton.textContent = "Cancel";
  projectForm.appendChild(cancelButton);
};

const loadTodos = (project) => {
  const todoViewContainer = document.getElementById("todo-view-container");
  const todos = project.getTodos();

  todos.forEach((todo) => {
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo");

    const todoCheckbox = document.createElement("input");
    todoCheckbox.type = "checkbox";
    todoCheckbox.dataset.project = todo.getLinkedProject().getTitle();
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
