"use strict";
import endOfToday from "date-fns/endOfToday";
import isToday from "date-fns/isToday";

const createTodo = (
  title,
  dueDate = endOfToday(),
  description = "",
  priority = "",
  notes = ""
) => {
  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;
  const getNote = () => notes;
  const isDueToday = () => isToday(dueDate);

  return {
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
    getNote,
    isDueToday,
  };
};

export default createTodo;
