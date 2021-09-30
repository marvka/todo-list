const DomFactory = (type, attributes, textContent) => {
  const element = document.createElement(type);

  if (attributes) {
    Object.keys(attributes).forEach((key) => {
      element.setAttribute(key, attributes[key]);
    });
  }

  if (textContent) {
    element.textContent = textContent;
  } else {
    element.textContent = '';
  }

  return element;
};

export default DomFactory;
