import { formatISO, parseISO } from 'date-fns';
import notepadSVG from '../../assets/edit-regular.svg';
import DomFactory from '../helper/DomFactory';
import { sortTodosByDueDate, sortTodosByTitle } from '../helper/Helper';
import Database from '../logic/Database';
import * as EventListeners from './EventListeners';

const body = document.querySelector('body');

const loadLayout = () => {
  const header = DomFactory('header');
  const sidebar = DomFactory('nav', { id: 'sidebar' });
  const todoViewContainer = DomFactory('div', { id: 'todo-view-container' });

  body.append(header, sidebar, todoViewContainer);
};

const loadHeader = () => {
  const header = document.querySelector('header');
  const title = DomFactory('h1', null, 'ToDoers');

  header.append(title);
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

  const sidebarList = DomFactory('ul', { id: 'projects' });
  sidebar.appendChild(sidebarList);

  const today = DomFactory('li', { id: 'today' }, 'Today');
  today.addEventListener('click', EventListeners.loadTodosDueToday);
  sidebarList.appendChild(today);

  Database.projects.forEach((project) => {
    const projectElement = DomFactory(
      'li',
      { id: project.title, class: 'project' },
      project.title
    );
    projectElement.addEventListener('click', EventListeners.loadProject);
    sidebarList.appendChild(projectElement);
  });

  // Move inbox to the top
  const inbox = document.querySelector('#Inbox');
  today.before(inbox);

  const addProject = DomFactory('li', { id: 'add-project' }, '+ Project');
  addProject.addEventListener('click', EventListeners.loadNewProjectForm);
  sidebarList.appendChild(addProject);
};

const unloadTodoView = () => {
  const todoViewContainer = document.getElementById('todo-view-container');
  if (todoViewContainer) todoViewContainer.innerHTML = '';
};

export const loadHeading = (title) => {
  const todoViewContainer = document.getElementById('todo-view-container');
  const heading = DomFactory('h2', { class: 'project-heading' }, title);
  todoViewContainer.appendChild(heading);
};

const loadTodo = (projectTitle, todo) => {
  const todoWrapper = DomFactory('div');
  const todoTitle = todo.title;
  const project = Database.findProject(projectTitle);

  const containerElement = DomFactory('div', {
    class: 'todo',
  });

  const descriptionToggleButton = DomFactory(
    'button',
    { class: 'show-description' },
    '+'
  );
  descriptionToggleButton.addEventListener(
    'click',
    EventListeners.toggleTodoDescription(todo)
  );

  const checkboxElement = DomFactory('input', {
    type: 'checkbox',
    class: 'delete-todo',
  });
  checkboxElement.addEventListener(
    'click',
    EventListeners.deleteTodo(project, todo)
  );

  const titleElement = DomFactory('p', null, todoTitle);

  const dueDateElement = DomFactory(
    'p',
    { class: 'due-date' },
    formatISO(todo.dueDate, { representation: 'date' })
  );

  const editButton = new Image();
  editButton.src = notepadSVG;
  editButton.id = 'notepadSVG';
  editButton.addEventListener('click', EventListeners.editTodo(project, todo));

  const description = DomFactory('p', {
    class: 'description',
  });
  description.textContent = todo.description || 'No description';

  containerElement.append(
    descriptionToggleButton,
    checkboxElement,
    titleElement,
    dueDateElement,
    editButton
  );
  todoWrapper.append(containerElement);
  todoWrapper.append(description);

  return todoWrapper;
};

const loadTodos = (projectTitle, todos) => {
  const todoViewContainer = document.getElementById('todo-view-container');

  todos.sort(sortTodosByTitle);
  todos.sort(sortTodosByDueDate);
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
    const newTodoButton = DomFactory('button', null, '+ Todo');
    newTodoButton.addEventListener(
      'click',
      EventListeners.loadNewTodoForm(project)
    );
    todoViewContainer.appendChild(newTodoButton);
  }
};

export const loadTodosDueToday = () => {
  unloadTodoView();
  loadHeading('Today');
  document.querySelector('.project-heading').id = 'today';
  const projectsWithTodosDueToday = Database.projects.filter(
    (project) => project.todosDueToday.length > 0
  );
  projectsWithTodosDueToday.forEach((project) => {
    const todos = project.todos.filter((todo) => todo.isDueToday());
    loadTodos(project.title, todos);
  });
};

export const reloadTodo = (todoContainer, projectTitle, todo) => {
  const newTodoContainer = loadTodo(projectTitle, todo);
  todoContainer.replaceWith(newTodoContainer);
};

export const init = () => {
  loadLayout();
  loadHeader();
  loadSidebar();
  loadProject(Database.findProject('Inbox'));
};
