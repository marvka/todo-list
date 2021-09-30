export default (title) => {
  let _title = title;
  const _todos = [];

  return {
    get title() {
      return _title;
    },
    set title(newTitle) {
      _title = newTitle;
    },
    get todos() {
      return _todos;
    },
    get todosDueToday() {
      return _todos.filter((todo) => todo.isDueToday());
    },
    addTodo(todo) {
      _todos.push(todo);
    },
    deleteTodo(todoTitle) {
      const index = _todos.findIndex((todo) => todo.title === todoTitle);
      _todos.splice(index, 1);
    },
    findTodo(todoTitle) {
      return _todos.find((todo) => todo.title === todoTitle);
    },
  };
};
