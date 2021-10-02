import Database from '../logic/Database';
import * as EventListeners from './EventListeners';
import { setSelectedIndex } from '../helper/Helper';
import DomFactory from '../helper/DomFactory';

const body = document.querySelector('body');

export const loadNewProjectForm = () => {
  const formContainer = DomFactory('div', {
    class: 'form-container',
    id: 'form-add-project',
  });
  body.appendChild(formContainer);

  const titleLabel = DomFactory('label', { for: 'add-project-title' }, 'Title');
  const titleInput = DomFactory('input', { type: 'text' }, 'form-title');

  const buttonContainer = DomFactory('div');
  const addButton = DomFactory('button', null, 'Submit');
  addButton.addEventListener('click', EventListeners.addNewProject);
  const cancelButton = DomFactory('button', null, 'Cancel');
  cancelButton.addEventListener('click', EventListeners.clearForm);
  buttonContainer.append(addButton, cancelButton);

  formContainer.append(titleLabel, titleInput, buttonContainer);
};

export const clearForm = () => {
  const formContainer = document.querySelector('div.form-container');
  if (formContainer) {
    formContainer.remove();
  }
};

const createTodoForm = (curProject, curTodo) => {
  // TODO: Style with grid
  const formContainer = DomFactory('div', {
    class: 'form-container',
    id: 'form-add-Todo',
  });

  const titleLabel = DomFactory('label', { for: 'form-title' }, 'Title');
  const titleInput = DomFactory('input', {
    type: 'text',
    value: curTodo ? curTodo.title : '',
    id: 'form-title',
  });

  const projectLabel = DomFactory(
    'label',
    { for: 'select-project' },
    'Project',
  );
  const projectSelection = DomFactory('select', {
    name: 'select-project',
    id: 'select-project',
  });
  Database.projects.forEach((project) => {
    const projectOption = DomFactory(
      'option',
      { value: project.title },
      project.title,
    );
    projectSelection.appendChild(projectOption);
  });
  if (curProject) setSelectedIndex(projectSelection, curProject.title);

  const descriptionLabel = DomFactory(
    'label',
    { for: 'form-description' },
    'Description(optional)',
  );
  const descriptionInput = DomFactory('input', {
    type: 'text',
    id: 'form-description',
    value: curTodo ? curTodo.description : '',
  });

  const dueDateLabel = DomFactory('label', { for: 'form-dueDate' }, 'Due Date');
  const dueDateInput = DomFactory('input', {
    type: 'date',
    id: 'form-dueDate',
  });
  if (typeof curTodo !== 'undefined') {
    dueDateInput.valueAsDate = curTodo ? curTodo.dueDate : '';
  }

  const priorityLabel = DomFactory(
    'label',
    { for: 'priority-select' },
    'Priority',
  );
  const selectPriority = DomFactory('select', {
    name: 'priority-select',
    id: 'priority-select',
  });
  const lowPriority = DomFactory('option', { value: 'low' }, 'Low');
  const mediumPriority = DomFactory('option', { value: 'medium' }, 'Medium');
  const highPriority = DomFactory('option', { value: 'high' }, 'High');
  selectPriority.append(lowPriority, mediumPriority, highPriority);
  if (curTodo && curTodo.priority) {
    setSelectedIndex(selectPriority, curTodo.priority);
  }

  formContainer.append(
    titleLabel,
    titleInput,
    projectLabel,
    projectSelection,
    descriptionLabel,
    descriptionInput,
    dueDateLabel,
    dueDateInput,
    priorityLabel,
    selectPriority,
  );
  return formContainer;
};

const createTodoFormButtons = (submitEventListener, cancelEventListener) => {
  const addButton = DomFactory('button', { id: 'form-add-todo' }, 'Submit');
  addButton.addEventListener('click', submitEventListener);

  const cancelButton = DomFactory('button', { id: 'form-cancel' }, 'Cancel');
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
