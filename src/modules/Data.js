"use strict";
const projects = []; // User defined projects

export const addProject = (project) => {
  projects.push(project);
};

export const getProjects = () => {
  return projects;
};

export const isEmpty = () => {
  if (!projects.length) return true;
};

export const findProject = (title) => {
  let project = projects.find((project) => project.getTitle() === title);
  if (project) return project;
};

export const storeInLocalStorage = () => {};

export const retrieveFromLocalStorage = () => {};

export const getTodosDueToday = () => {
  const dueToday = [];
  projects.forEach((project) => {
    const todos = project.getTodosDueToday();
    if (todos.length) {
      todos.forEach((todo) => dueToday.push(todo));
    }
  });
  return dueToday;
};

export const getProjectsWithTodosDueToday = () => {
  const _projects = projects.filter((project) => project.hasTodos);
};
