const projects = [];

export const addProject = (project) => {
  projects.push(project);
};
export const getProjects = () => {
  return projects;
};
export const storeInLocalStorage = (key, obj) => {
  return localStorage.setItem(key, JSON.stringify(obj));
};
export const retrieveFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
