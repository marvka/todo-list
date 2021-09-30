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

export const loadNewTodoForm = (project) => () => {
  Forms.clearForm();
  Forms.loadNewTodoForm(project);
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

export const submitTodo = () => {
  if (document.querySelector('div#form-add-todo')) {
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
  }
};

export const editTodo = (event) => {
  const project = Database.findProject(event.target.parentNode.dataset.project);
  const todo = project.findTodo(event.target.parentNode.dataset.todo);

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
