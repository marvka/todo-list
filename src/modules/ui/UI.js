import formatISO from 'date-fns/formatISO';
import notepadSVG from '../../assets/edit-regular.svg';
import DomFactory from '../helper/DomFactory';
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
      project.title,
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
  const heading = DomFactory('h2', { id: 'active-project-title' }, title);
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

export const init = () => {
  loadLayout();
  loadHeader();
  loadSidebar();
  loadProject(Database.findProject('Inbox'));
};
