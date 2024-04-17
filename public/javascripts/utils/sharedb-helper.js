import ReconnectingWebSocket from 'https://unpkg.com/reconnecting-websocket@^4.4.0/dist/reconnecting-websocket-mjs.js';

class ShareDBHelper {
  static doc;

  static #socket;
  static #connection;

  static init() {
    // Open web socket
    console.log('[ShareDBHelper] Opening web socket...');
    this.#socket = new ReconnectingWebSocket(`wss://${window.location.host}`, [], {
      maxEnqueuedMessages: 0
    });

    this.#socket.addEventListener('open', this.#handleSocketOpen);
    this.#socket.addEventListener('close', this.#handleSocketClose);
    this.#socket.addEventListener('error', this.#handleSocketError);

    // Create ShareDB connection
    console.log('[ShareDBHelper] Creating ShareDB connection...');
    this.#connection = new ShareDBClient.Connection(this.#socket);
    this.#connection.on('state', this.#handleConnectionState);

    // Init ShareDB document and
    this.doc = this.#connection.get('emoji_paintings', '1');
    document.dispatchEvent(new Event('sharedb-document-ready'));

    // Subscribe to the document
    console.log('[ShareDBHelper] Subscribing to the ShareDB document...');
    this.doc.subscribe(this.#handleDocSubscribe.bind(this));
  }

  static #handleSocketOpen() {
    console.log('[ShareDBHelper] ✅ Web socket open.');
  }

  static #handleSocketClose() {
    console.log('[ShareDBHelper] ⚠️ Web socket closed!');
  }

  static #handleSocketError() {
    console.error('[ShareDBHelper] ❌ Web socket errored.');
  }

  static #handleConnectionState(newState, reason) {
    console.log(`[ShareDBHelper] ℹ️ ShareDB connection state changed: ${newState}.${reason ? ` (Reason: ${reason}.)` : ''}`);
  }

  static #handleDocSubscribe(error) {
    // Handle error
    if (error) {
      console.error('[ShareDBHelper] ❌ ShareDB document subscription errored:', error);
      return;
    }

    // If doc.type is undefined, the document has not been created, so let's create it
    if (!this.doc.type) {
      const initialDocument = {
        emojis: []
      }

      this.doc.create(initialDocument, this.#handleDocCreate.bind(this));
    }

    console.log('[ShareDBHelper] ✅ ShareDB document subscription sucessful.', this.doc);
  }

  static #handleDocCreate(error) {
    // Handle error
    if (error) {
      console.error('[ShareDBHelper] ❌ ShareDB document creation failed:', error);
      return;
    }

    console.log('[ShareDBHelper] ✅ ShareDB document created sucessfully.');
  }
}

export default ShareDBHelper;
