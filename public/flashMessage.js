const containerName = "flash-message--container";

/**
 *
 */
const prepareEnvironment = () => {
  const container = document.createElement("section");
  container.classList.add(containerName);
  document.querySelector("body").appendChild(container);
};

/**
 *
 * @param {*} message
 */
const addMessage = ({ message = "", type = "success", timeout = 3000 }) => {
  const el = document.createElement("section");
  el.classList.add("flash-message--message");
  el.classList.add(`flash-message--message__${type}`);

  el.innerHTML = message;

  const closeButton = document.createElement("button");
  closeButton.addEventListener("click", (evt) => {
    el.remove();
  });
  closeButton.classList.add("flash-message--close-button");
  closeButton.innerHTML = "❌";
  el.appendChild(closeButton);

  const selector = `.${containerName}`;
  document.querySelector(selector).appendChild(el);

  setTimeout(() => {
    el.remove();
  }, timeout);
};

export { prepareEnvironment, addMessage };
