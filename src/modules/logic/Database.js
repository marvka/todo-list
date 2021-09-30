import parseISO from 'date-fns/parseISO';
import Project from './Project';
import Todo from './Todo';

const Data = () => {
  const _projects = [];

  return {
    get projects() {
      return _projects;
    },
    addProject(project) {
      _projects.push(project);
    },
    findProject(title) {
      const matchedProject = _projects.find(
        (project) => project.title === title,
      );
      return matchedProject || false;
    },
    save() {
      localStorage.clear();
      localStorage.setItem('projects', JSON.stringify(_projects));
    },
    load() {
      // TODO: Rewrite function
      const storedProjects = JSON.parse(localStorage.getItem('projects'));
      storedProjects.forEach((storedProject) => {
        const project = Project(storedProject.title);
        storedProject.todos.forEach((todo) => {
          project.addTodo(
            Todo(
              todo.title,
              parseISO(todo.dueDate),
              todo.description,
              todo.priority,
            ),
          );
        });
        _projects.push(project);
      });
    },
    getTodosDueToday() {
      const dueToday = [];
      _projects.forEach((project) => {
        const todos = project.getTodosDueToday;
        if (todos.length) {
          todos.forEach((todo) => dueToday.push(todo));
        }
      });
      return dueToday;
    },
  };
};

export default Data();
