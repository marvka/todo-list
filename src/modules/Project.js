"use strict";
const createProject = (title) => {
  const todos = [];
  const getTitle = () => title;
  const addTodo = (todo) => todos.push(todo);
  const deleteTodo = (title) => {
    const index = todos.findIndex((todo) => todo.getTitle() == title);
    todos.splice(index, 1);
  };
  const findTodo = (title) => {
    let matchingTodo;
    todos.forEach((todo) => {
      if (todo.getTitle() === title) {
        matchingTodo = todo;
      }
    });
    return matchingTodo;
  };
  const getTodos = () => todos;
  const getTodosDueToday = () => {
    return todos.filter((todo) => todo.isDueToday());
  };
  const isEmpty = () => {
    if (!todos.length) return true;
  };

  return {
    getTitle,
    addTodo,
    deleteTodo,
    findTodo,
    getTodos,
    getTodosDueToday,
    isEmpty,
  };
};

export default createProject;
