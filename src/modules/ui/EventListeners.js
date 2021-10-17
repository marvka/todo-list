import parseISO from 'date-fns/parseISO';
import * as UI from './UI';
import Database from '../logic/Database';
import * as Forms from './Forms';
import Project from '../logic/Project';
import Todo from '../logic/Todo';

export const loadNewProjectForm = () => {
  Forms.clearForm();
  Forms.loadNewProjectForm();
};

export const loadNewTodoForm = (project) => () => {
  Forms.clearForm();
  Forms.loadNewTodoForm(project);
};

export const loadTodosDueToday = () => {
  // TODO: Change the view so that projects that have todos due today are
  // shown, and their respecitve todos are underneath the project titles
  const projectsWithTodosDueToday = Database.projects.filter(
    (project) => project.todosDueToday.length > 0,
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
  const project = Database.findProject(
    document.querySelector('select#select-project').value,
  );
  const title = document.querySelector('input#form-title').value;
  const dueDate = document.querySelector('input#form-dueDate').valueAsDate;
  const description = document.querySelector('input#form-description').value;
  const priority = document.querySelector('select#priority-select').value;
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
  // FIXME: Changed todos always propagate to the bottom of the todo list when
  // submitting. Might have to implement alphabetical sorting or sorting by due
  // date or some such down in UI.loadProject or UI.loadTodos
  const newProject = Database.findProject(
    document.querySelector('select#select-project').value,
  );
  const newTitle = document.querySelector('input#form-title').value;
  const newDueDate = document.querySelector('input#form-dueDate').valueAsDate;
  const newDescription = document.querySelector('input#form-description').value;
  const newPriority = document.querySelector('select#priority-select').value;

  project.deleteTodo(todo.title);
  newProject.addTodo(Todo(newTitle, newDueDate, newDescription, newPriority));

  Database.save();
  UI.loadProject(project);
  Forms.clearForm();
};

export const toggleTodoDescription = (todo) => (event) => {
  const button = event.target;
  const todoContainer = event.target.parentNode;

  if (document.querySelector('#description-container')) {
    UI.unloadTodoDescription();
    button.textContent = '+';
  } else {
    UI.loadTodoDescription(todoContainer, todo);
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
