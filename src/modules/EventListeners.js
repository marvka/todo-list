import parseISO from 'date-fns/parseISO';
import * as UI from './UI';
import Database from './Database';
import * as Forms from './Forms';
import Project from './Project';
import Todo from './Todo';

export const loadNewProjectForm = () => {
  Forms.clearForm();
  Forms.loadNewProjectForm();
};

export const loadNewTodoForm = () => {
  Forms.clearForm();
  Forms.loadNewTodoForm();
};

export const loadTodosDueToday = () => {
  const projectsWithTodosDueToday = Database.projects.filter(
    (project) => project.todosDueToday.length > 0,
  );
  UI.loadTodosDueToday(projectsWithTodosDueToday);
};

export const addNewProject = () => {
  if (document.querySelector('div.form-container')) {
    const title = document.getElementById('form-title').value;
    const project = Project(title);
    Database.addProject(project);
    Database.save();
    UI.loadSidebar();
    Forms.clearForm();
  }
};

export const addTodo = () => {
  if (document.querySelector('div#form-add-todo')) {
    const project = Database.findProject(
      document.querySelector('#active-project-title').textContent,
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
  }
};

export const toggleTodoDescription = (event) => {
  const button = event.target;
  const project = Database.findProject(event.target.parentNode.dataset.project);
  const todoContainer = event.target.parentNode;
  const todo = project.findTodo(event.target.parentNode.dataset.todo);

  if (document.querySelector('#description-container')) {
    UI.unloadTodoDescription();
    button.textContent = '+';
  } else {
    UI.loadTodoDescription(todoContainer, project, todo);
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

export const deleteTodo = (event) => {
  const title = event.target.parentNode.dataset.todo;
  const project = Database.findProject(event.target.parentNode.dataset.project);
  const currentView = event.target.parentNode.parentNode.firstChild.textContent;
  project.deleteTodo(title);
  Database.save();
  if (currentView === 'Today') {
    loadTodosDueToday();
  } else {
    UI.loadProject(project);
  }
};
