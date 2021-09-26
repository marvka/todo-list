import Database from './Database';
import * as UI from './UI';
import Project from './Project';
import Todo from './Todo';

const init = () => {
  const inbox = Project('Inbox');
  const greetingTodo = Todo('This is a todo');
  inbox.addTodo(greetingTodo);
  const helpTodo = Todo('Feel free to add your own projects and todos!');
  inbox.addTodo(helpTodo);
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
