import * as EventListeners from "./EventListeners";
const body = document.querySelector("body");

export const loadNewProjectForm = () => {
  const formContainer = document.createElement("div");
  formContainer.id = "form-add-project";
  formContainer.classList.add("form-container");
  body.appendChild(formContainer);

  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Title";
  titleLabel.setAttribute("for", "add-project-title");
  formContainer.appendChild(titleLabel);
  const titleInput = document.createElement("input");
  titleInput.setAttribute("type", "text");
  titleInput.id = "form-title";
  formContainer.appendChild(titleInput);

  const buttonContainer = document.createElement("div");
  const addButton = document.createElement("button");
  addButton.textContent = "Add";
  addButton.addEventListener("click", EventListeners.addNewProject);
  buttonContainer.appendChild(addButton);
  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", EventListeners.clearForm);
  buttonContainer.appendChild(cancelButton);
  formContainer.appendChild(buttonContainer);
};

export const clearForm = () => {
  const formContainer = document.querySelector("div.form-container");
  if (formContainer) {
    formContainer.remove();
  }
};

export const loadNewTodoForm = () => {
  const formContainer = document.createElement("div");
  formContainer.id = "form-add-todo";
  formContainer.classList.add("form-container");
  body.appendChild(formContainer);

  const titleContainer = document.createElement("div");
  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Title";
  titleLabel.setAttribute("for", "form-title");
  titleContainer.appendChild(titleLabel);
  const titleInput = document.createElement("input");
  titleInput.setAttribute("type", "text");
  titleInput.id = "form-title";
  titleContainer.appendChild(titleInput);
  formContainer.appendChild(titleContainer);

  const descriptionContainer = document.createElement("div");
  const descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Description (optional)";
  descriptionLabel.setAttribute("for", "form-description");
  descriptionContainer.appendChild(descriptionLabel);
  const descriptionInput = document.createElement("input");
  descriptionInput.setAttribute("type", "text");
  descriptionInput.id = "form-description";
  descriptionContainer.appendChild(descriptionInput);
  formContainer.appendChild(descriptionContainer);

  const dueDateContainer = document.createElement("div");
  const dueDateLabel = document.createElement("label");
  dueDateLabel.textContent = "Due Date";
  dueDateLabel.setAttribute("for", "form-dueDate");
  dueDateContainer.appendChild(dueDateLabel);
  const dueDateInput = document.createElement("input");
  dueDateInput.setAttribute("type", "date");
  dueDateInput.id = "form-dueDate";
  dueDateContainer.appendChild(dueDateInput);
  formContainer.appendChild(dueDateContainer);

  const priorityContainer = document.createElement("div");
  const priorityLabel = document.createElement("label");
  priorityLabel.textContent = "Priority";
  priorityLabel.setAttribute("for", "priority-select");
  priorityContainer.appendChild(priorityLabel);
  const selectPriority = document.createElement("select");
  selectPriority.setAttribute("name", "priority-select");
  selectPriority.id = "priority-select";
  priorityContainer.appendChild(selectPriority);
  const lowPriority = document.createElement("option");
  lowPriority.value = "low";
  lowPriority.textContent = "Low";
  lowPriority.selected;
  selectPriority.appendChild(lowPriority);
  const mediumPriority = document.createElement("option");
  mediumPriority.value = "medium";
  mediumPriority.textContent = "Medium";
  mediumPriority.selected;
  selectPriority.appendChild(mediumPriority);
  const highPriority = document.createElement("option");
  highPriority.value = "high";
  highPriority.textContent = "High";
  highPriority.selected;
  selectPriority.appendChild(highPriority);
  formContainer.appendChild(priorityContainer);

  const noteContainer = document.createElement("div");
  const noteLabel = document.createElement("label");
  noteLabel.setAttribute("for", "form-note");
  noteLabel.textContent = "Note (optional)";
  noteContainer.appendChild(noteLabel);
  const noteTextArea = document.createElement("textarea");
  noteTextArea.id = "form-note";
  noteContainer.appendChild(noteTextArea);
  formContainer.appendChild(noteContainer);

  const addButton = document.createElement("button");
  addButton.id = "form-add-todo";
  addButton.textContent = "Add";
  addButton.addEventListener("click", EventListeners.addTodo);
  formContainer.appendChild(addButton);

  const cancelButton = document.createElement("button");
  cancelButton.id = "form-cancel";
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", EventListeners.clearForm);
  formContainer.appendChild(cancelButton);
};
