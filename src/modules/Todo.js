"use strict";
import endOfToday from "date-fns/endOfToday";
import isToday from "date-fns/isToday";

const createTodo = (title, dueDate = endOfToday(), description, priority) => {
  let linkedProject;
  const getTitle = () => title;
  const getDueDate = () => dueDate;
  const getDescription = () => description;
  const setDescription = (newDescription) => (description = newDescription);
  const getPriority = () => priority;
  const isDueToday = () => isToday(dueDate);
  const linkToProject = (project) => (linkedProject = project);
  const getLinkedProject = () => linkedProject;

  return {
    getTitle,
    getDueDate,
    getDescription,
    setDescription,
    getPriority,
    isDueToday,
    linkToProject,
    getLinkedProject,
  };
};
export default createTodo;
