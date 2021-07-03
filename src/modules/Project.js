"use strict";
const createProject = (title) => {
  const todos = [];
  const getTitle = () => title;
  const addTodo = (todo) => todos.push(todo);
  const deleteTodo = (title) => {
    const index = todos.findIndex((todo) => todo.getTitle() == title);
    todos.splice(index, 1);
  };
  const getTodos = () => todos;
  const getTodosDueToday = () => {
    const dueToday = [];
    todos.forEach((todo) => {
      if (todo.isDueToday()) dueToday.push(todo);
    });
    return dueToday;
  };
  const isEmpty = () => {
    if (!todos.length) return true;
  };

  return { getTitle, addTodo, deleteTodo, getTodos, getTodosDueToday, isEmpty };
};

export default createProject;
