import Database from './Database';
import * as UI from '../ui/UI';
import Project from './Project';
import Todo from './Todo';

const init = () => {
  const inbox = Project('Inbox');
  inbox.addTodo(Todo('This is a todo'));
  inbox.addTodo(Todo('Feel free to add your own projects and todos!'));
  Database.addProject(inbox);
};

export default () => {
  if (localStorage.length) {
    Database.load();
  } else {
    init();
  }
  UI.initialize();
};
