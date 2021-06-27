import * as Data from "./Data";
import * as UI from "./UI";
import createProject from "./Project";
import createTodo from "./Todo";

export const initialize = () => {
  Data.retrieveProjectsFromLocalStorage();
  if (!Data.getProjects().length) {
    const defaultProject = createProject("Default");
    const defaultTodo = createTodo("Default Todo");

    defaultProject.addTodo(defaultTodo);
    Data.addProject(defaultProject);
  }
  UI.initialize();
  const defaultProject = Data.getProjects()[0];
};
