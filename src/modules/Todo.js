"use strict";
import endOfToday from "date-fns/endOfToday";
import isToday from "date-fns/isToday";

const createTodo = (title, dueDate = endOfToday()) => {
  let description, priority, note, linkedProject;
  const setTitle = (newTitle) => (title = newTitle);
  const getTitle = () => title;
  const setDescription = (newDescription) => (description = newDescription);
  const getDescription = () => description;
  const setDueDate = (newDueDate) => (dueDate = newDueDate);
  const getDueDate = () => dueDate;
  const setPriority = (newPriority) => (priority = newPriority);
  const getPriority = () => priority;
  const editNote = (newNote) => (note = newNote);
  const getNotes = () => notes;
  const isDueToday = () => isToday(dueDate);
  const linkProject = (project) => (linkedProject = project);
  const getLinkedProject = () => linkedProject;

  return {
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
    getNotes,
    isDueToday,
    linkProject,
    getLinkedProject,
  };
};
export default createTodo;
