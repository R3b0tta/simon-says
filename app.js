class Component {
  /**
   * @type {Array<Component>} - An array to store child components.
   */
  #children = [];

  /**
   * @type {HTMLElement} - The HTML node associated with the component.
   */
  #node = null;

  /**
   * Creates a new Component.
   * @constructor
   * @param {Object} options - The options for creating the component.
   * @param {string=} options.tag - HTML element tag (default is 'div').
   * @param {string=} options.className - CSS class name for the element.
   * @param {string=} options.text - Text content of the element.
   * @param {...Component} children - Child components to be appended.
   */
  constructor({ tag = "div", className = "", text = "" }, ...children) {
    const node = document.createElement(tag);
    node.className = className;
    node.textContent = text;
    this.#node = node;

    if (children) {
      this.appendChildren(children);
    }
  }

  /**
   * Appends a child component to the current component.
   * @param {Component} child - The child component to be appended.
   */
  append(child) {
    this.#children.push(child);
    this.#node.append(child.getNode());
  }

  /**
   * Appends an array of child components to the current component.
   * @param {Array<Component>} children - Array of child components to be appended.
   */
  appendChildren(children) {
    children.forEach((el) => {
      this.append(el);
    });
  }

  /**
   * Returns the HTML node associated with the component.
   * @returns {HTMLElement} - The HTML node.
   */
  getNode() {
    return this.#node;
  }

  /**
   * Returns an array of child components.
   * @returns {Array<Component>} - Array of child components.
   */
  getChildren() {
    return this.#children;
  }

  /**
   * Sets the text content of the component.
   * @param {string} content - The text content to be set.
   */
  setTextContent(content) {
    this.#node.textContent = content;
  }

  /**
   * Sets an attribute on the component's HTML node.
   * @param {string} attribute - The attribute to set.
   * @param {string} value - The value to set for the attribute.
   */
  setAttribute(attribute, value) {
    this.#node.setAttribute(attribute, value);
  }

  /**
   * Removes an attribute from the component's HTML node.
   * @param {string} attribute - The attribute to remove.
   */
  removeAttribute(attribute) {
    this.#node.removeAttribute(attribute);
  }

  /**
   * Toggles the presence of a CSS class on the component's HTML node.
   * @param {string} className - The class name to toggle.
   */
  toggleClass(className) {
    this.#node.classList.toggle(className);
  }

  /**
   * Adds an event listener to the component's HTML node.
   * @param {string} event - The event type to listen for.
   * @param {EventListener} listener - The callback function to be executed when the event occurs.
   * @param {boolean|AddEventListenerOptions} [options=false] - An options object specifying characteristics of the event listener.
   */
  addListener(event, listener, options = false) {
    this.#node.addEventListener(event, listener, options);
  }

  /**
   * Removes an event listener from the component's HTML node.
   * @param {string} event - The event type for which to remove the listener.
   * @param {EventListener} listener - The listener function to be removed.
   * @param {boolean|EventListenerOptions} [options=false] - Options that were used when adding the listener.
   */
  removeListener(event, listener, options = false) {
    this.#node.removeEventListener(event, listener, options);
  }

  /**
   * Destroys all child components associated with the current component.
   */
  destroyChildren() {
    this.#children.forEach((child) => {
      child.destroy();
    });
    this.#children.length = 0;
  }

  /**
   * Destroys the current component and removes its HTML node from the DOM.
   */
  destroy() {
    this.destroyChildren();
    this.#node.remove();
  }
}
class ImgComponent extends Component {
  constructor({ className, src }) {
    super({ tag: "img", className });
    this.setAttribute("src", src);
  }
  setSrc(src) {
    this.setAttribute("src", src);
  }
}

class TitleComponent extends Component {
  constructor({ className, text }) {
    super({ tag: "div", className, text });
  }
}

class ComplexityComponent extends Component {
  constructor({ src, text, id }) {
    super({
      tag: "div",
      className: `header__complexity-item`,
    });
    this.setAttribute("id", id);
    const img = new ImgComponent({ className: `header__complexity-img`, src });
    const title = new TitleComponent({
      className: `header__complexity-title`,
      text,
    });
    this.appendChildren([img, title]);
  }
}

const complexityItems = [
  { src: "img/easy.jpg", text: "Easy", id: "easy" },
  { src: "img/medium.png", text: "Medium", id: "medium" },
  { src: "img/hard.avif", text: "Hard", id: "hard" },
];

const complexityComponents = complexityItems.map(
  (item) => new ComplexityComponent(item),
);

const headerComplexityComponent = new Component(
  {
    tag: "div",
    className: "header__complexity",
  },
  ...complexityComponents,
);

const header = new Component(
  {
    tag: "section",
    className: "header",
  },
  new Component({
    tag: "div",
    className: "header__title",
    text: "DIFFICULTY LEVEL",
  }),
  headerComplexityComponent,
);

class ButtonComponent extends Component {
  constructor({ className, text, id }) {
    super({ tag: "button", className, text });
    this.setAttribute("id", id);
  }
}
class RowComponent extends Component {
  constructor({ className, buttons }) {
    super({ tag: "div", className });
    buttons.forEach((buttonConfig) => {
      const button = new ButtonComponent(buttonConfig);
      this.append(button);
    });
  }
}
class KeyboardComponent extends Component {
  constructor({ rows, className, id }) {
    super({ tag: "div", className });
    rows.forEach((rowConfig) => {
      const row = new RowComponent(rowConfig);
      this.append(row);
    });
    this.setAttribute("id", id);
  }
}
const keyboardLayoutBeta = [
  [
    { text: "Q", id: "key-Q", className: "key" },
    { text: "W", id: "key-W", className: "key" },
    { text: "E", id: "key-E", className: "key" },
    { text: "R", id: "key-R", className: "key" },
    { text: "T", id: "key-T", className: "key" },
    { text: "Y", id: "key-Y", className: "key" },
    { text: "U", id: "key-U", className: "key" },
    { text: "I", id: "key-I", className: "key" },
    { text: "O", id: "key-O", className: "key" },
    { text: "P", id: "key-P", className: "key" },
  ],
  [
    { text: "A", id: "key-A", className: "key" },
    { text: "S", id: "key-S", className: "key" },
    { text: "D", id: "key-D", className: "key" },
    { text: "F", id: "key-F", className: "key" },
    { text: "G", id: "key-G", className: "key" },
    { text: "H", id: "key-H", className: "key" },
    { text: "J", id: "key-J", className: "key" },
    { text: "K", id: "key-K", className: "key" },
    { text: "L", id: "key-L", className: "key" },
  ],
  [
    { text: "Z", id: "key-Z", className: "key" },
    { text: "X", id: "key-X", className: "key" },
    { text: "C", id: "key-C", className: "key" },
    { text: "V", id: "key-V", className: "key" },
    { text: "B", id: "key-B", className: "key" },
    { text: "N", id: "key-N", className: "key" },
    { text: "M", id: "key-M", className: "key" },
  ],
];
const keyboardLayoutAlpha = [
  [
    { text: "1", id: "key-1", className: "key" },
    { text: "2", id: "key-2", className: "key" },
    { text: "3", id: "key-3", className: "key" },
    { text: "4", id: "key-4", className: "key" },
    { text: "5", id: "key-5", className: "key" },
    { text: "6", id: "key-6", className: "key" },
    { text: "7", id: "key-7", className: "key" },
    { text: "8", id: "key-8", className: "key" },
    { text: "9", id: "key-9", className: "key" },
    { text: "0", id: "key-0", className: "key" },
  ],
];
const keyboardRowsAlpha = keyboardLayoutAlpha.map((keys, index) => ({
  className: `keyboard__row row-${index + 1}`,
  buttons: keys,
}));
const keyboardRowsBeta = keyboardLayoutBeta.map((keys, index) => ({
  className: `keyboard__row row-${index + 1}`,
  buttons: keys,
}));
const keyboardAlpha = new KeyboardComponent({
  rows: keyboardRowsAlpha,
  className: "keyboard-alpha",
  id: "alpha",
});
const keyboardBeta = new KeyboardComponent({
  rows: keyboardRowsBeta,
  className: "keyboard-beta",
  id: "beta",
});
const roundCount = new Component({
  className: "rounds",
  text: "Round: 1",
});

const field = new Component({
  tag: "section",
  className: "field",
});
const options = new Component(
  {
    className: "options",
  },
  new ButtonComponent({
    className: "options__button",
    id: "new",
    text: "new game",
  }),
  new ButtonComponent({
    className: "options__button",
    id: "start",
    text: "start",
  }),
  new ButtonComponent({
    className: "options__button",
    id: "repeat",
    text: "Repeat the sequence",
  }),
);
const utilities = new Component({
  className: "utilities",
});
document.body.append(header.getNode());
document.body.append(roundCount.getNode());
document.body.append(field.getNode());
document.body.append(keyboardAlpha.getNode());
document.body.append(keyboardBeta.getNode());
document.body.append(options.getNode());
document.body.append(utilities.getNode());
// logic
let currentRound = 1;
let maxRounds = 5;
let gameSequence = [];
let userSequence = [];
let currentStep = 0;
let difficulty = "easy";
let errorCount = 0;
// random generation sequence
function generateSequence(round) {
  const sequenceLength = 2 + (round - 1) * 2;
  const keysHard = [..."1234567890QWERTYUIOPASDFGHJKLZXCVBNM"];
  const keysEasy = [..."1234567890"];
  const keysMedium = [..."QWERTYUIOPASDFGHJKLZXCVBNM"];
  const sequence = [];
  if (difficulty === "hard") {
    for (let i = 0; i < sequenceLength; i++) {
      const RandomKeyIndex = Math.floor(Math.random() * keysHard.length);
      sequence.push(keysHard[RandomKeyIndex]);
    }
  } else if (difficulty === "easy") {
    for (let i = 0; i < sequenceLength; i++) {
      const RandomKeyIndex = Math.floor(Math.random() * keysEasy.length);
      sequence.push(keysEasy[RandomKeyIndex]);
    }
  } else {
    for (let i = 0; i < sequenceLength; i++) {
      const RandomKeyIndex = Math.floor(Math.random() * keysMedium.length);
      sequence.push(keysMedium[RandomKeyIndex]);
    }
  }
  return sequence;
}
// highlight section
const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
async function highlightSequence(sequence) {
  newGameButton.disabled = true;
  for (const key of sequence) {
    const button = document.getElementById(`key-${key}`);
    if (button) {
      button.classList.add("active");
      playSound("sounds/keyboard.mp3");
      await delay(500);
      button.classList.remove("active");
      await delay(500);
    }
  }
  newGameButton.disabled = false;
}
async function greenHighlight() {
  document.querySelector(".field").style.color = "green";
  document.querySelector(".utilities").style.color = "green";
  await delay(3000);
  document.querySelector(".utilities").style.color = "#fff";
  document.querySelector(".field").style.color = "#fff";
}
async function redHighlight() {
  document.querySelector(".field").style.color = "red";
  document.querySelector(".utilities").style.color = "red";
  await delay(3000);
  document.querySelector(".utilities").style.color = "#fff";
  document.querySelector(".field").style.color = "#fff";
}
// checking user input
const startRoundButton = document.getElementById("start");
const repeatSequenceButton = document.getElementById("repeat");
const newGameButton = document.getElementById("new");
repeatSequenceButton.disabled = true;
function handleUserInput(key) {
  if (key === gameSequence[currentStep]) {
    userSequence.push(key);
    field.setTextContent(userSequence.join(""));
    currentStep++;
    if (currentStep === gameSequence.length) {
      if (currentRound >= maxRounds) {
        utilities.setTextContent("Congratulations! You win game!");
        repeatSequenceButton.disabled = true;
        startRoundButton.disabled = false;
        playSound("sounds/win.mp3");
        greenHighlight();
        repeatSequenceButton.disabled = true;
      } else {
        utilities.setTextContent("Congratulations! You win round!");
        currentRound++;
        disableKeyboard();
        startRoundButton.style.display = "block";
        repeatSequenceButton.style.display = "none";
        startRoundButton.textContent = "next";
        playSound("sounds/win-round.mp3");
        greenHighlight();
      }
    }
  } else if (errorCount < 1) {
    utilities.setTextContent("Error! Errors left: 0");
    playSound("sounds/error.mp3");
    redHighlight();
    errorCount++;
  } else {
    utilities.setTextContent("Error! Try again!");
    startRoundButton.disabled = false;
    playSound("sounds/fail.mp3");
    resetGame();
    redHighlight();
  }
}
// starting game
async function startRound() {
  userSequence = [];
  currentStep = 0;
  field.setTextContent("");
  errorCount = 0;
  roundCount.setTextContent(`Round: ${currentRound}`);
  gameSequence = generateSequence(currentRound);
  startRoundButton.style.display = "none";
  newGameButton.style.display = "block";
  repeatSequenceButton.style.display = "block";
  newGameButton.disabled = true;
  disableChangeDifficulty();
  await delay(1000);
  await highlightSequence(gameSequence);
  enableKeyboard();
  newGameButton.disabled = false;
  repeatSequenceButton.disabled = false;
}
// reset game
function resetGame() {
  currentRound = 1;
  userSequence = [];
  gameSequence = [];
  currentStep = 0;
  errorCount = 0;
  field.setTextContent("");
  roundCount.setTextContent("Round: 1");
  startRoundButton.textContent = "start";
  newGameButton.style.display = "none";
  startRoundButton.style.display = "block";
  repeatSequenceButton.style.display = "none";
  disableKeyboard();
  enableChangeDifficulty();
}
startRoundButton.addEventListener("click", () => {
  startRound();
});
repeatSequenceButton.addEventListener("click", async () => {
  repeatSequenceButton.disabled = true;
  field.setTextContent("");
  userSequence = [];
  currentStep = 0;
  await highlightSequence(gameSequence);
});
newGameButton.addEventListener("click", () => {
  resetGame();
});
let keyboardStatus = false;
function enableKeyboard() {
  [...document.querySelectorAll(".key")].forEach((button) => {
    button.classList.remove("disabled");
    keyboardStatus = true;
  });
}
function disableChangeDifficulty() {
  EasyButton.classList.add("inactive");
  MediumButton.classList.add("inactive");
  HardButton.classList.add("inactive");
}
function enableChangeDifficulty() {
  EasyButton.classList.remove("inactive");
  MediumButton.classList.remove("inactive");
  HardButton.classList.remove("inactive");
}
function disableKeyboard() {
  [...document.querySelectorAll(".key")].forEach((button) => {
    button.classList.add("disabled");
    keyboardStatus = false;
  });
}
function playSound(src) {
  const audio = new Audio(src);
  audio.play();
}
disableKeyboard();

document.addEventListener("keydown", (event) => {
  if (difficulty !== "hard") return;
  if (!keyboardStatus) return;
  const key = event.key.toUpperCase();
  if ([..."1234567890QWERTYUIOPASDFGHJKLZXCVBNM"].includes(key)) {
    handleUserInput(key);
    playSound("sounds/keyboard.mp3");
  }
});

document.addEventListener("keydown", (event) => {
  if (difficulty !== "medium") return;
  if (!keyboardStatus) return;
  const key = event.key.toUpperCase();
  if ([..."QWERTYUIOPASDFGHJKLZXCVBNM"].includes(key)) {
    handleUserInput(key);
    playSound("sounds/keyboard.mp3");
  }
});

document.addEventListener("keydown", (event) => {
  if (difficulty !== "easy") return;
  if (!keyboardStatus) return;
  const key = event.key.toUpperCase();
  if ([..."1234567890"].includes(key)) {
    handleUserInput(key);
    playSound("sounds/keyboard.mp3");
  }
});

[...document.querySelectorAll(".key")].forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.textContent;
    handleUserInput(key);
    playSound("sounds/keyboard.mp3");
  });
});

// change difficulty
const EasyButton = document.getElementById("easy");
const MediumButton = document.getElementById("medium");
const HardButton = document.getElementById("hard");
const keyboardAlphaStyle = document.getElementById("alpha");
const keyboardBetaStyle = document.getElementById("beta");

EasyButton.classList.add("active");

EasyButton.addEventListener("click", () => {
  EasyButton.classList.add("active");
  MediumButton.classList.remove("active");
  HardButton.classList.remove("active");
  difficulty = "easy";
  keyboardAlphaStyle.style.display = "block";
  keyboardBetaStyle.style.display = "none";
  utilities.setTextContent("");
  resetGame();
});
MediumButton.addEventListener("click", () => {
  EasyButton.classList.remove("active");
  MediumButton.classList.add("active");
  HardButton.classList.remove("active");
  difficulty = "medium";
  keyboardAlphaStyle.style.display = "none";
  keyboardBetaStyle.style.display = "block";
  utilities.setTextContent("");
  resetGame();
});
HardButton.addEventListener("click", () => {
  EasyButton.classList.remove("active");
  MediumButton.classList.remove("active");
  HardButton.classList.add("active");
  difficulty = "hard";
  keyboardAlphaStyle.style.display = "block";
  keyboardBetaStyle.style.display = "block";
  utilities.setTextContent("");
  resetGame();
});
