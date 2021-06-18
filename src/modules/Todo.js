import endOfToday from "date-fns/endOfToday";
export default function createTodo(
  title,
  dueDate = endOfToday(),
  description = "",
  priority = "",
  notes = ""
) {
  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;
  const getNote = () => notes;

  return {
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
    getNote,
  };
}
