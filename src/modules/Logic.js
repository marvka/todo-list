"use strict";
import * as Data from "./Data";
import * as UI from "./UI";
import createProject from "./Project";
import createTodo from "./Todo";

export const initialize = () => {
  Data.retrieveFromLocalStorage();
  if (!Data.getProjects().length) {
    populateDefaultData();
  }
  UI.initialize();
};

const populateDefaultData = () => {
  if (!Data.getProjects().length) {
    const inbox = createProject("Inbox");
    const greetingTodo = createTodo("This is a todo");
    greetingTodo.linkToProject(inbox);
    inbox.addTodo(greetingTodo);
    const helpTodo = createTodo(
      "Feel free to add your own projects and todos!"
    );
    helpTodo.linkToProject(inbox);
    inbox.addTodo(helpTodo);
    Data.setInbox(inbox);
  }
};
