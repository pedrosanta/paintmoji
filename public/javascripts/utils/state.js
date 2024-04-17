const state = {
  emoji: '👍'
};

export function setEmoji(emoji) {
  state.emoji = emoji;
  document.dispatchEvent(new Event('emoji-state-updated'));
}

export default state;
