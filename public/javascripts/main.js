import EmojiPickerButton from "./components/emoji-picker-button.js ";
import EmojiCanvas from "./components/emoji-canvas.js";

customElements.define('emoji-picker-button', EmojiPickerButton);
customElements.define('emoji-canvas', EmojiCanvas);

window.clearEmojiCanvas = () => {
  document.querySelector('.emoji-canvas__canvas').innerHTML = '';
  Notiflix.Notify.success('Canvas cleared.');
};
