const ShareDB = require('sharedb');
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');

const backend = new ShareDB();

function wsConnectionHandler(webSocket) {
  const stream = new WebSocketJSONStream(webSocket);
  backend.listen(stream);
}

exports.backend = backend;
exports.wsConnectionHandler = wsConnectionHandler;
