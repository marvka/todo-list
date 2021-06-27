import isToday from "date-fns/isToday";

const projects = [];

export const addProject = (project) => {
  projects.push(project);
};

export const getProjects = () => {
  return projects;
};

export const findProject = (title) => {
  return projects.find((project) => project.getTitle() === title);
};

export const storeProjectsInLocalStorage = () => {
  localStorage.setItem("projects", JSON.stringify(projects));
};
export const retrieveProjectsFromLocalStorage = () => {
  JSON.parse(localStorage.getItem("projects"));
};

export const getTodosDueToday = () => {
  const dueToday = [];
  projects.forEach((project) => {
    project.getTodos().forEach((todo) => {
      if (isToday(todo.getDueDate())) dueToday.push(todo);
    });
  });
  return dueToday;
};
