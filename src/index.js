// Rewrite modules to only use exports and not createSomething style
import './style.css';
import Database from './modules/logic/Database';
import * as UI from './modules/ui/UI';
import Project from './modules/logic/Project';
import Todo from './modules/logic/Todo';

const init = () => {
  const inbox = Project('Inbox');
  inbox.addTodo(Todo('This is a todo'));
  inbox.addTodo(Todo('Feel free to add your own projects and todos!'));
  Database.addProject(inbox);
};

if (localStorage.length) {
  Database.load();
} else {
  init();
}
UI.init();
