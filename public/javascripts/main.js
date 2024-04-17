import EmojiPickerButton from './components/emoji-picker-button.js';
import EmojiCanvas from './components/emoji-canvas.js';
import EmojiCanvasClearButton from './components/emoji-canvas-clear-button.js';

import ShareDBHelper from './utils/sharedb-helper.js';

customElements.define('emoji-picker-button', EmojiPickerButton);
customElements.define('emoji-canvas', EmojiCanvas);
customElements.define('emoji-canvas-clear-button', EmojiCanvasClearButton);

ShareDBHelper.init();
