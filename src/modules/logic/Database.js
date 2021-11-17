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
        (project) => project.title === title
      );
      return matchedProject || false;
    },
    save() {
      localStorage.clear();
      localStorage.setItem('projects', JSON.stringify(_projects));
    },
    load() {
      JSON.parse(localStorage.getItem('projects')).forEach((storedProject) => {
        const newProject = Project(storedProject.title);
        storedProject.todos.forEach((todo) => {
          newProject.addTodo(Object.assign(Todo(), todo));
        });
        this.addProject(newProject);
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
