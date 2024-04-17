import ReconnectingWebSocket from 'https://unpkg.com/reconnecting-websocket@^4.4.0/dist/reconnecting-websocket-mjs.js';

class ShareDBHelper {
  static doc;

  static #socket;

  static init() {
    console.log('[ShareDBHelper] Opening web socket...');
    this.#socket = new ReconnectingWebSocket(`ws://${window.location.host}`, [], {
      maxEnqueuedMessages: 0
    });

    this.#socket.addEventListener('open', this.#handleSocketOpen);
    this.#socket.addEventListener('close', this.#handleSocketClose);
    this.#socket.addEventListener('error', this.#handleSocketClose);
  }

  static #handleSocketOpen() {
    console.log('[ShareDBHelper] ✅ Web socket open.');
  }

  static #handleSocketClose() {
    console.log('[ShareDBHelper] ⚠️ Web socket closed!');
  }

  static #handleSocketError() {
    console.log('[ShareDBHelper] ❌ Web socket errored.');
  }
}

export default ShareDBHelper;
