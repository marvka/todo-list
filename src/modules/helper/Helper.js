export const setSelectedIndex = (selectionDOM, value) => {
  for (let i = 0; i < selectionDOM.options.length; i += 1) {
    if (selectionDOM.options[i].value === value) {
      selectionDOM.options[i].selected = true;
    }
  }
};
