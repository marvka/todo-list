import parseISO from 'date-fns/parseISO';
import { isValid } from 'date-fns';
import * as UI from './UI';
import Database from '../logic/Database';
import * as Forms from './Forms';
import Project from '../logic/Project';
import Todo from '../logic/Todo';
import DomFactory from '../helper/DomFactory';
import { getChildNodeWithClass } from '../helper/Helper';

export const loadNewProjectForm = () => {
  Forms.clearForm();
  Forms.loadNewProjectForm();
};

export const loadNewTodoForm = (project) => () => {
  Forms.clearForm();
  Forms.loadNewTodoForm(project);
};

export const loadTodosDueToday = () => {
  const projectsWithTodosDueToday = Database.projects.filter(
    (project) => project.todosDueToday.length > 0
  );
  UI.loadTodosDueToday(projectsWithTodosDueToday);
};

export const addNewProject = () => {
  const title = document.getElementById('form-title').value;
  const project = Project(title);
  Database.addProject(project);
  Database.save();
  UI.loadSidebar();
  Forms.clearForm();
};

export const addTodo = () => {
  if (document.querySelector('.error-message')) {
    document.querySelectorAll('.invalid').forEach((element) => {
      element.classList.remove('invalid');
    });
    document.querySelector('.error-message').remove();
  }
  const titleElement = document.querySelector('input#form-title');
  const projectElement = document.querySelector('select#select-project');
  const dueDateElement = document.querySelector('input#form-dueDate');
  const descriptionElement = document.querySelector('input#form-description');
  const priorityElement = document.querySelector('select#priority-select');

  const project = Database.findProject(projectElement.value);
  const title = titleElement.value;
  if (title.length === 0) {
    titleElement.classList.add('invalid');
  } else if (titleElement.classList.contains('invalid')) {
    titleElement.classList.remove('invalid');
  }
  const dueDate = dueDateElement.valueAsDate;
  if (!isValid(dueDate)) {
    dueDateElement.classList.add('invalid');
  } else if (dueDateElement.classList.contains('invalid')) {
    dueDateElement.classList.remove('invalid');
  }
  const description = descriptionElement.value;
  const priority = priorityElement.value;

  if (document.querySelector('.invalid')) {
    const formContainer = document.querySelector('.form-container');
    const errorMessage = DomFactory(
      'p',
      { class: 'error-message' },
      'Please fill in the highlighted fields!'
    );
    formContainer.appendChild(errorMessage);
    return;
  }

  const newTodo = Todo(title, dueDate, description, priority);
  project.addTodo(newTodo);
  Database.save();
  UI.loadProject(project);
  Forms.clearForm();
};

export const editTodo = (project, todo) => () => {
  Forms.clearForm();
  Forms.loadEditTodoForm(project, todo);
};

export const submitTodoChanges = (project, todo) => () => {
  const newProject = Database.findProject(
    document.querySelector('select#select-project').value
  );
  const newTitle = document.querySelector('input#form-title').value;
  const newDueDate = document.querySelector('input#form-dueDate').valueAsDate;
  const newDescription = document.querySelector('input#form-description').value;
  const newPriority = document.querySelector('select#priority-select').value;

  project.deleteTodo(todo.title);
  newProject.addTodo(Todo(newTitle, newDueDate, newDescription, newPriority));

  Database.save();
  // FIXME: loadProject loads the project, but not the Today overview when
  // editing a todo while in the Today overview
  UI.loadProject(project);
  Forms.clearForm();
};

export const toggleTodoDescription = (todo) => (event) => {
  const button = event.target;
  const todoWrapper = event.target.parentNode.parentNode;
  const descriptionElement = getChildNodeWithClass('description', todoWrapper);

  if (descriptionElement.style.display) {
    descriptionElement.style.display = '';
    button.textContent = '+';
  } else {
    descriptionElement.style.display = 'block';
    button.textContent = '-';
  }
};

export const clearForm = () => {
  Forms.clearForm();
};

export const loadProject = (event) => {
  const project = Database.findProject(event.target.textContent);
  UI.loadProject(project);
};

export const deleteTodo = (project, todo) => (event) => {
  const currentView = event.target.parentNode.parentNode.firstChild.textContent;
  project.deleteTodo(todo.title);
  Database.save();
  if (currentView === 'Today') {
    loadTodosDueToday();
  } else {
    UI.loadProject(project);
  }
};
