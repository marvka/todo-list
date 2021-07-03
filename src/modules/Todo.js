"use strict";
import endOfToday from "date-fns/endOfToday";
import isToday from "date-fns/isToday";

const createTodo = (title, dueDate = endOfToday()) => {
  let linkedProject;
  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;
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
