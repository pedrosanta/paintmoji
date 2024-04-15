import state from '../state.js';

class EmojiPickerButton extends HTMLElement {
  constructor() {
    super();

    console.log('New emoji picker button:', this);

    this.buttonEl = document.createElement('button');
    this.buttonEl.textContent = state.emoji;
    this.appendChild(this.buttonEl);
  }
}

export default EmojiPickerButton;
