export default function createTodo(title) {
  const setTitle = (newTitle) => (title = newTitle);
  const getTitle = () => title;
  const setDescription = (newDescription) => (description = newDescription);
  const getDescription = () => description;
  const setDueDate = (newDueDate) => (dueDate = newDueDate);
  const getDueDate = () => dueDate;
  const setPriority = (newPriority) => (priority = newPriority);
  const getPriority = () => priority;
  const setNote = (newNote) => (note = newNote);
  const getNote = () => note;

  return {
    setTitle,
    getTitle,
    setDescription,
    getDescription,
    setDueDate,
    getDueDate,
    setPriority,
    getPriority,
    setNote,
    getNote,
  };
}
