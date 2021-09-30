const DomFactory = (type, attributes, textContent = '') => {
  const element = document.createElement(type);

  Object.keys(attributes).forEach((key) => {
    element.setAttribute(key, attributes[key]);
  });

  element.textContent = textContent;

  return element;
};

export default DomFactory;
