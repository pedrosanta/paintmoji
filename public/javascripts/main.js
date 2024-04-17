import EmojiPickerButton from './components/emoji-picker-button.js';
import EmojiCanvas from './components/emoji-canvas.js';
import ReconnectingWebsocket from 'https://unpkg.com/reconnecting-websocket@^4.4.0/dist/reconnecting-websocket-mjs.js';

customElements.define('emoji-picker-button', EmojiPickerButton);
customElements.define('emoji-canvas', EmojiCanvas);

window.clearEmojiCanvas = () => {
  document.querySelector('.emoji-canvas__canvas').innerHTML = '';
  Notiflix.Notify.success('Canvas cleared.');
};
