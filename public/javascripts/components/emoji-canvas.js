import state from '../utils/state.js';
import ShareDBHelper from '../utils/sharedb-helper.js';

class EmojiCanvas extends HTMLElement {
  constructor() {
    super();

    this.cursorEl = document.createElement('div');
    this.cursorEl.className = 'emoji-canvas__cursor';
    this.cursorEl.textContent = state.emoji;
    this.appendChild(this.cursorEl);

    this.canvasEl = document.createElement('div');
    this.canvasEl.className = 'emoji-canvas__canvas';
    this.appendChild(this.canvasEl);

    this.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.addEventListener('click', this.handleClick.bind(this));

    document.addEventListener('emoji-state-updated', () => this.cursorEl.textContent = state.emoji );

    // Wait for ShareDB document to be ready
    document.addEventListener('sharedb-document-ready', () => {
      // Handle current ShareDB document state when subscribing
      ShareDBHelper.doc.on('load', this.handleShareDBLoad.bind(this));

      // Handle ShareDB document ops (remote and *local*)
      ShareDBHelper.doc.on('op', this.handleShareDBOp.bind(this));
    });
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

    // Submit ShareDB operation
    ShareDBHelper.doc.submitOp({
      p: ['emojis', ShareDBHelper.doc.data.emojis.length],
      li: {
        emoji: state.emoji,
        top,
        left
      }
    }, {}, (error) => {
      if(error)
        console.error('[EmojiCanvas] 💥 Error sending op:', error);
    });

  }

  handleShareDBOp() {
    console.log('[EmojiCanvas] Received op, handling.');

    let innerHTML= '';

    ShareDBHelper.doc.data.emojis.forEach(emoji => {
      innerHTML+= `<div class="emoji-canvas__paint" style="top: ${emoji.top}%; left: ${emoji.left}%;">${emoji.emoji}</div>`;
    });

    this.canvasEl.innerHTML = innerHTML;
  }

  handleShareDBLoad() {
    if(!ShareDBHelper.doc.data) return;

    console.log('[EmojiCanvas] Document loaded. Handling/applying state.');

    ShareDBHelper.doc.data.emojis.forEach( emoji => this.placePaint(emoji));
  }

  placePaint({emoji, top, left}) {
    const paintEl = document.createElement('div');
    paintEl.className = 'emoji-canvas__paint';
    paintEl.textContent = emoji;
    paintEl.style.top = `${top}%`;
    paintEl.style.left = `${left}%`;
    this.canvasEl.appendChild(paintEl);
  }
}

export default EmojiCanvas;
