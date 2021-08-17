"use strict";
import endOfToday from "date-fns/endOfToday";
import isToday from "date-fns/isToday";

const createTodo = (title, dueDate = endOfToday(), description, priority) => {
  const getTitle = () => title;
  const getDueDate = () => dueDate;
  const getDescription = () => description;
  const setDescription = (newDescription) => (description = newDescription);
  const getPriority = () => priority;
  const isDueToday = () => isToday(dueDate);

  return {
    getTitle,
    getDueDate,
    getDescription,
    setDescription,
    getPriority,
    isDueToday,
  };
};
export default createTodo;
