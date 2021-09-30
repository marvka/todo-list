import formatISO from 'date-fns/formatISO';
import Database from '../logic/Database';
import * as EventListeners from './EventListeners';
import notepadSVG from '../../assets/edit-regular.svg';

const body = document.querySelector('body');

const loadLayout = () => {
  const header = document.createElement('header');
  body.appendChild(header);

  const sidebar = document.createElement('nav');
  sidebar.id = 'sidebar';
  body.appendChild(sidebar);

  const todoViewContainer = document.createElement('div');
  todoViewContainer.id = 'todo-view-container';
  body.appendChild(todoViewContainer);
};

const loadHeader = () => {
  const header = document.querySelector('header');

  const title = document.createElement('h1');
  title.textContent = 'ToDoers';
  header.appendChild(title);
};

export const clearSideBar = () => {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.innerHTML = '';
  }
};

export const loadSidebar = () => {
  clearSideBar();
  const sidebar = document.getElementById('sidebar');

  const sidebarList = document.createElement('ul');
  sidebarList.id = 'projects';
  sidebar.appendChild(sidebarList);

  const today = document.createElement('li');
  today.id = 'today';
  today.textContent = 'Today';
  today.addEventListener('click', EventListeners.loadTodosDueToday);
  sidebarList.appendChild(today);

  Database.projects.forEach((project) => {
    const projectElement = document.createElement('li');
    projectElement.textContent = project.title;
    projectElement.id = project.title;
    projectElement.classList.add('project');
    projectElement.addEventListener('click', EventListeners.loadProject);
    sidebarList.appendChild(projectElement);
  });

  const inbox = document.querySelector('#Inbox');
  today.before(inbox);

  const addProject = document.createElement('li');
  addProject.textContent = '+ Project';
  addProject.id = 'add-project';
  addProject.addEventListener('click', EventListeners.loadNewProjectForm);
  sidebarList.appendChild(addProject);
};

const unloadTodoView = () => {
  const todoViewContainer = document.getElementById('todo-view-container');
  if (todoViewContainer) todoViewContainer.innerHTML = '';
};

export const loadHeading = (title) => {
  const todoViewContainer = document.getElementById('todo-view-container');
  const heading = document.createElement('h2');
  heading.textContent = title;
  heading.id = 'active-project-title';
  todoViewContainer.appendChild(heading);
};

const loadTodo = (projectTitle, todo) => {
  const todoTitle = todo.title;

  const todoContainer = document.createElement('div');
  todoContainer.classList.add('todo');
  todoContainer.dataset.todo = todoTitle;
  todoContainer.dataset.project = projectTitle;

  const descriptionToggleButton = document.createElement('button');
  descriptionToggleButton.classList.add('show-description');
  descriptionToggleButton.addEventListener(
    'click',
    EventListeners.toggleTodoDescription,
  );
  descriptionToggleButton.textContent = '+';
  todoContainer.appendChild(descriptionToggleButton);

  const todoCheckbox = document.createElement('input');
  todoCheckbox.type = 'checkbox';
  todoCheckbox.classList.add('delete-todo');
  todoCheckbox.addEventListener('click', EventListeners.deleteTodo);
  todoContainer.appendChild(todoCheckbox);

  const todoTitleDiv = document.createElement('div');
  todoTitleDiv.textContent = todoTitle;
  todoContainer.appendChild(todoTitleDiv);

  const todoDueDate = document.createElement('div');
  todoDueDate.classList.add('due-date');
  todoDueDate.textContent = formatISO(todo.dueDate, {
    representation: 'date',
  });
  todoContainer.appendChild(todoDueDate);

  const todoEditButton = new Image();
  todoEditButton.src = notepadSVG;
  todoEditButton.id = 'notepadSVG';
  todoEditButton.addEventListener('click', EventListeners.editTodo);
  todoContainer.appendChild(todoEditButton);

  return todoContainer;
};

const loadTodos = (projectTitle, todos) => {
  const todoViewContainer = document.getElementById('todo-view-container');

  todos.forEach((todo) => {
    const todoContainer = loadTodo(projectTitle, todo);
    todoViewContainer.appendChild(todoContainer);
  });
};

export const loadProject = (project) => {
  const todoViewContainer = document.getElementById('todo-view-container');

  unloadTodoView();
  loadHeading(project.title);
  loadTodos(project.title, project.todos);
  if (project.title !== 'Today') {
    const newTodoButton = document.createElement('button');
    newTodoButton.textContent = '+ Todo';
    newTodoButton.addEventListener(
      'click',
      EventListeners.loadNewTodoForm(project),
    );
    todoViewContainer.appendChild(newTodoButton);
  }
};

export const loadTodosDueToday = (projectsWithTodosDueToday) => {
  unloadTodoView();
  loadHeading('Today');
  projectsWithTodosDueToday.forEach((project) => {
    const todos = project.todos.filter((todo) => todo.isDueToday());
    loadTodos(project.title, todos);
  });
};

export const loadTodoDescription = (todoContainer, project, todo) => {
  const descriptionContainer = document.getElementById('description-container')
    || document.createElement('div');
  if (descriptionContainer.hasChildNodes()) {
    descriptionContainer.innerHTML = '';
  }
  descriptionContainer.id = 'description-container';
  descriptionContainer.dataset.project = project.title;
  descriptionContainer.dataset.todo = todo.title;

  const descriptionDiv = document.createElement('div');
  descriptionDiv.textContent = todo.description || 'No Description';

  todoContainer.after(descriptionContainer);
  descriptionContainer.appendChild(descriptionDiv);
};

export const unloadTodoDescription = () => {
  const descriptionContainer = document.querySelector('#description-container');
  descriptionContainer.remove();
};

export const reloadTodo = (todoContainer, projectTitle, todo) => {
  const newTodoContainer = loadTodo(projectTitle, todo);
  todoContainer.replaceWith(newTodoContainer);
};

export const initialize = () => {
  loadLayout();
  loadHeader();
  loadSidebar();
  loadProject(Database.findProject('Inbox'));
};