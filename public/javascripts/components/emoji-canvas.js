import state from '../state.js'

class EmojiCanvas extends HTMLElement {
  constructor() {
    super();

    console.log('New emoji canvas:', this);

    this.cursorEl = document.createElement('div');
    this.cursorEl.className = 'emoji-canvas__cursor';
    this.cursorEl.textContent = state.emoji;
    this.appendChild(this.cursorEl);

    this.addEventListener('mousemove', this.handleMouseMove.bind(this));
  }

  handleMouseMove(event) {
    this.cursorEl.style.top = event.y - this.offsetTop;
    this.cursorEl.style.left = event.x - this.offsetLeft;
  }
}

export default EmojiCanvas;
