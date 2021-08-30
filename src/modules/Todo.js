import endOfToday from 'date-fns/endOfToday';
import isToday from 'date-fns/isToday';

export default (title, dueDate = endOfToday(), description, priority) => {
  let _title = title;
  let _dueDate = dueDate;
  let _description = description;
  let _priority = priority;

  return {
    get title() {
      return _title;
    },
    set title(newTitle) {
      _title = newTitle;
    },
    get dueDate() {
      return dueDate;
    },
    set dueDate(newDueDate) {
      _dueDate = newDueDate;
    },
    get description() {
      return _description;
    },
    set description(newDescription) {
      _description = newDescription;
    },
    get priority() {
      return _priority;
    },
    set priority(newPriority) {
      _priority = newPriority;
    },
    isDueToday() {
      return isToday(_dueDate);
    },
  };
};
