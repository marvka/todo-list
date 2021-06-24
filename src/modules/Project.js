const createProject = (title) => {
  const todos = [];
  const getTitle = () => title;
  const addTodo = (todo) => todos.push(todo);
  const deleteTodo = (title) => {
    const index = todos.findIndex((todo) => todo.getTitle() == title);
    todos.splice(index, 1);
  };
  const getTodos = () => todos;

  return { getTitle, addTodo, deleteTodo, getTodos };
};

export default createProject;
