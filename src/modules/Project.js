export default (title) => {
  let _title = title;
  const todos = [];

  return {
    get title() {
      return _title;
    },
    set title(newTitle) {
      _title = newTitle;
    },
    get todos() {
      return todos;
    },
    get todosDueToday() {
      return todos.filter((todo) => todo.isDueToday());
    },
    addTodo(todo) {
      todos.push(todo);
    },
    deleteTodo(todoTitle) {
      const index = todos.findIndex((todo) => todo.title === todoTitle);
      todos.splice(index, 1);
    },
    findTodo(todoTitle) {
      return todos.find((todo) => todo.title === todoTitle);
    },
  };
};
