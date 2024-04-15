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
    this.addEventListener('click', this.handleClick.bind(this));
  }

  handleMouseMove(event) {
    this.cursorEl.style.top = event.y - this.offsetTop;
    this.cursorEl.style.left = event.x - this.offsetLeft;
  }

  handleClick(event) {
    const x = event.x - this.offsetLeft;
    const y = event.y - this.offsetTop;

    const top = y * 100 / this.offsetHeight;
    const left = x * 100 / this.offsetWidth;

    console.log('Emoji canvas click:', top, left);
  }
}

export default EmojiCanvas;
