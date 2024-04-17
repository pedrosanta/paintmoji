import ShareDBHelper from '../utils/sharedb-helper.js';

class EmojiCanvasClearButton extends HTMLElement {
  counter = 0;

  constructor() {
    super();

    // Wait for ShareDB document to be ready
    document.addEventListener('sharedb-document-ready', () => {
      // Handle current ShareDB document state when subscribing
      ShareDBHelper.doc.on('load', this.handleShareDBLoad.bind(this));

      // Handle ShareDB document ops (remote and *local*)
      ShareDBHelper.doc.on('op', this.handleShareDBOp.bind(this));
    });

    // Add click listener
    this.querySelector('button').addEventListener('click', this.handleClick);
  }

  handleShareDBLoad() {
    if(!ShareDBHelper.doc.data) return;

    this.counter = ShareDBHelper.doc.data.emojis.length;
  }

  handleShareDBOp() {
    // Check if a clear has happened (beware, still doesn't catch all situations...)
    if(ShareDBHelper.doc.data.emojis.length < this.counter) {
      Notiflix.Notify.success('Canvas cleared.');
    }

    this.counter = ShareDBHelper.doc.data.emojis.length;
  }

  handleClick() {
    ShareDBHelper.doc.submitOp({
      p: ['emojis'],
      od: ShareDBHelper.doc.data.emojis,
      oi: []
    }, {}, (error) => {
      if(error)
        console.error('[EmojiCanvasClearButton] 💥 Error sending op:', error);
    });
  }
}

export default EmojiCanvasClearButton;
