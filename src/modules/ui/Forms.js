import Database from '../logic/Database';
import * as EventListeners from './EventListeners';
import { setSelectedIndex } from '../helper/Helper';

const body = document.querySelector('body');

export const loadNewProjectForm = () => {
  const formContainer = document.createElement('div');
  formContainer.id = 'form-add-project';
  formContainer.classList.add('form-container');
  body.appendChild(formContainer);

  const titleLabel = document.createElement('label');
  titleLabel.textContent = 'Title';
  titleLabel.setAttribute('for', 'add-project-title');
  formContainer.appendChild(titleLabel);
  const titleInput = document.createElement('input');
  titleInput.setAttribute('type', 'text');
  titleInput.id = 'form-title';
  formContainer.appendChild(titleInput);

  const buttonContainer = document.createElement('div');
  const addButton = document.createElement('button');
  addButton.textContent = 'Submit';
  addButton.addEventListener('click', EventListeners.addNewProject);
  buttonContainer.appendChild(addButton);
  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.addEventListener('click', EventListeners.clearForm);
  buttonContainer.appendChild(cancelButton);
  formContainer.appendChild(buttonContainer);
};

export const clearForm = () => {
  const formContainer = document.querySelector('div.form-container');
  if (formContainer) {
    formContainer.remove();
  }
};

const createTodoForm = (curProject, curTodo) => {
  const formContainer = document.createElement('div');
  formContainer.id = 'form-add-todo';
  formContainer.classList.add('form-container');

  const titleContainer = document.createElement('div');
  const titleLabel = document.createElement('label');
  titleLabel.textContent = 'Title';
  titleLabel.setAttribute('for', 'form-title');
  titleContainer.appendChild(titleLabel);
  const titleInput = document.createElement('input');
  titleInput.setAttribute('type', 'text');
  titleInput.id = 'form-title';
  titleInput.value = curTodo ? curTodo.title : '';
  titleContainer.appendChild(titleInput);
  formContainer.appendChild(titleContainer);

  const projectContainer = document.createElement('div');
  const projectLabel = document.createElement('label');
  projectLabel.textContent = 'Project';
  projectLabel.setAttribute('for', 'select-project');
  projectContainer.appendChild(projectLabel);
  const projectSelection = document.createElement('select');
  projectSelection.setAttribute('name', 'select-project');
  projectSelection.id = 'select-project';
  projectContainer.appendChild(projectSelection);
  Database.projects.forEach((project) => {
    const projectOption = document.createElement('option');
    projectOption.textContent = project.title;
    projectOption.value = project.title;
    projectSelection.appendChild(projectOption);
  });
  if (curProject) setSelectedIndex(projectSelection, curProject.title);
  formContainer.appendChild(projectContainer);

  const descriptionContainer = document.createElement('div');
  const descriptionLabel = document.createElement('label');
  descriptionLabel.textContent = 'Description (optional)';
  descriptionLabel.setAttribute('for', 'form-description');
  descriptionContainer.appendChild(descriptionLabel);
  const descriptionInput = document.createElement('input');
  descriptionInput.setAttribute('type', 'text');
  descriptionInput.id = 'form-description';
  descriptionInput.value = curTodo ? curTodo.description : '';
  descriptionContainer.appendChild(descriptionInput);
  formContainer.appendChild(descriptionContainer);

  const dueDateContainer = document.createElement('div');
  const dueDateLabel = document.createElement('label');
  dueDateLabel.textContent = 'Due Date';
  dueDateLabel.setAttribute('for', 'form-dueDate');
  dueDateContainer.appendChild(dueDateLabel);
  const dueDateInput = document.createElement('input');
  dueDateInput.setAttribute('type', 'date');
  dueDateInput.id = 'form-dueDate';
  if (typeof curTodo !== 'undefined') {
    dueDateInput.valueAsDate = curTodo ? curTodo.dueDate : '';
  }
  dueDateContainer.appendChild(dueDateInput);
  formContainer.appendChild(dueDateContainer);

  const priorityContainer = document.createElement('div');
  const priorityLabel = document.createElement('label');
  priorityLabel.textContent = 'Priority';
  priorityLabel.setAttribute('for', 'priority-select');
  priorityContainer.appendChild(priorityLabel);
  const selectPriority = document.createElement('select');
  selectPriority.setAttribute('name', 'priority-select');
  selectPriority.id = 'priority-select';
  priorityContainer.appendChild(selectPriority);
  const lowPriority = document.createElement('option');
  lowPriority.value = 'low';
  lowPriority.textContent = 'Low';
  selectPriority.appendChild(lowPriority);
  const mediumPriority = document.createElement('option');
  mediumPriority.value = 'medium';
  mediumPriority.textContent = 'Medium';
  selectPriority.appendChild(mediumPriority);
  const highPriority = document.createElement('option');
  highPriority.value = 'high';
  highPriority.textContent = 'High';
  selectPriority.appendChild(highPriority);
  if (curTodo && curTodo.priority) {
    setSelectedIndex(selectPriority, curTodo.priority);
  }
  formContainer.appendChild(priorityContainer);

  return formContainer;
};

const createTodoFormButtons = (submitEventListener, cancelEventListener) => {
  const addButton = document.createElement('button');
  addButton.id = 'form-add-todo';
  addButton.textContent = 'Submit';
  addButton.addEventListener('click', submitEventListener);

  const cancelButton = document.createElement('button');
  cancelButton.id = 'form-cancel';
  cancelButton.textContent = 'Cancel';
  cancelButton.addEventListener('click', cancelEventListener);

  return [addButton, cancelButton];
};

export const loadNewTodoForm = (project) => {
  const todoForm = createTodoForm(project);
  const buttons = createTodoFormButtons(
    EventListeners.submitTodo,
    EventListeners.clearForm,
  );
  buttons.forEach((button) => todoForm.appendChild(button));
  body.appendChild(todoForm);
};

export const loadEditTodoForm = (project, todo) => {
  const todoForm = createTodoForm(project, todo);
  const buttons = createTodoFormButtons(
    EventListeners.submitTodoChanges(project, todo),
    EventListeners.clearForm,
  );
  buttons.forEach((button) => todoForm.appendChild(button));
  body.appendChild(todoForm);
};
