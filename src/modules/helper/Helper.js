import { isAfter } from 'date-fns';

export const setSelectedIndex = (selectionDOM, value) => {
  for (let i = 0; i < selectionDOM.options.length; i += 1) {
    if (selectionDOM.options[i].value === value) {
      selectionDOM.options[i].selected = true;
    }
  }
};

export const getChildNodeWithClass = (className, parentNode) => {
  let matchingNode;
  parentNode.childNodes.forEach((node) => {
    if (node.classList.contains(className)) {
      matchingNode = node;
    }
  });
  return matchingNode;
};

export const sortTodosByDueDate = (todo1, todo2) => isAfter(todo1.dueDate, todo2.dueDate);

export const sortTodosByTitle = (todo1, todo2) => {
  if (todo1.title > todo2.title) {
    return 1;
  }
  return -1;
};
