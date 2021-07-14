"use strict";
import endOfToday from "date-fns/endOfToday";
import isToday from "date-fns/isToday";

const createTodo = (
  title,
  dueDate = endOfToday(),
  description,
  priority,
  notes
) => {
  let linkedProject;
  const getTitle = () => title;
  const getDueDate = () => dueDate;
  const getDescription = () => description;
  const getPriority = () => priority;
  const getNotes = () => notes;
  const isDueToday = () => isToday(dueDate);
  const linkToProject = (project) => (linkedProject = project);
  const getLinkedProject = () => linkedProject;

  return {
    getTitle,
    getDueDate,
    getDescription,
    getPriority,
    getNotes,
    isDueToday,
    linkToProject,
    getLinkedProject,
  };
};
export default createTodo;
