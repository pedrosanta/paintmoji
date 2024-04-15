import state, { setEmoji } from '../state.js';

class EmojiPickerButton extends HTMLElement {
  constructor() {
    super();

    console.log('New emoji picker button:', this);

    this.style.position = 'relative';

    this.buttonEl = document.createElement('button');
    this.buttonEl.textContent = state.emoji;
    this.buttonEl.addEventListener('click', this.togglePicker.bind(this));
    this.appendChild(this.buttonEl);

    this.pickerEl = this.initPicker();
    this.appendChild(this.pickerEl);

    this.pickerOpen = false;
  }

  initPicker() {
    const pickerOptions = {
      onEmojiSelect: this.handleEmojiSelect.bind(this),
      onClickOutside: this.handleClickOutside.bind(this)
    };

    const picker = new EmojiMart.Picker(pickerOptions);
    picker.style.position='absolute';
    picker.style.zIndex = 2;
    picker.style.left = '50%';
    picker.style.top = '150%';
    picker.style.transform = 'translateX(-50%)';
    picker.style.display = 'none';

    return picker;
  }

  handleEmojiSelect(emoji) {
    setEmoji(emoji.native);
    this.buttonEl.textContent = state.emoji;
    this.togglePicker();
  }

  handleClickOutside(event) {
    if(this.pickerOpen && event.target !== this.buttonEl)
      this.togglePicker();
  }

  togglePicker() {
    if(this.pickerOpen) {
      this.pickerEl.style.display = 'none';
      this.pickerOpen = false;
    } else {
      this.pickerEl.style.display = 'flex';
      this.pickerOpen = true;
    }
  }
}

export default EmojiPickerButton;
