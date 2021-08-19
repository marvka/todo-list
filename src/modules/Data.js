"use strict";
import createProject from "./Project";
import createTodo from "./Todo";
import parseISO from "date-fns/parseISO";

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

export const storeDataInLocalStorage = () => {
  localStorage.clear();
  const _projects = projects.reduce((projectsArr, currentProject) => {
    const title = currentProject.getTitle();
    const todos = currentProject.getTodos().map((todo) => todo.getPlain());
    projectsArr.push({ title, todos });
    return projectsArr;
  }, []);
  localStorage.setItem("projects", JSON.stringify(_projects));
};

export const retrieveDataFromLocalStorage = () => {
  const _projects = JSON.parse(localStorage.getItem("projects"));
  _projects.forEach((project) => {
    const _project = createProject(project.title);
    project.todos.forEach((todo) => {
      const _todo = createTodo(
        todo.title,
        parseISO(todo.dueDate),
        todo.description,
        todo.priority
      );
      _project.addTodo(_todo);
    });
    projects.push(_project);
  });
};

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
