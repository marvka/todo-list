"use strict";
import endOfToday from "date-fns/endOfToday";
import isToday from "date-fns/isToday";

const createTodo = (title, dueDate = endOfToday(), description, priority) => {
  const getTitle = () => title;
  const getDueDate = () => dueDate;
  const setDueDate = (newDueDate) => (dueDate = newDueDate);
  const getDescription = () => description;
  const setDescription = (newDescription) => (description = newDescription);
  const getPriority = () => priority;
  const isDueToday = () => isToday(dueDate);
  const getPlain = () => {
    return {
      title,
      dueDate,
      description,
      priority,
    };
  };

  return {
    getTitle,
    getDueDate,
    setDueDate,
    getDescription,
    setDescription,
    getPriority,
    isDueToday,
    getPlain,
  };
};
export default createTodo;
