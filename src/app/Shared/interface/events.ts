export enum Event {
  // generic socket.io events
  Connect = "connect",
  Connection = "connection",
  Disconnect = "disconnect", // Fired upon disconnection.
  Disconecting = "disconnecting", // Fired when the client is going to be disconnected (but hasn't left its rooms yet).
  Error = "error", // Fired when an error occurs.

  // custom events
  TokenRequest = "tokenRequest", // received from clients to obtain token
  Token = "token", // emitted by server with generated token
  Paired = "paired",
  Suspend = "suspend"
}

// Handler returns true if socket event was successfully handled, false otherwise.
//export type Handler = (socket: SocketIO.Socket, ...args: any[]) => boolean;
export enum Event_Type {
  HANDSHAKE=0,
  MY_CONTACT=1,
  CONTACTS=2,
  SETTINGS=3,
  MESSAGE=4,
  ARCHIVED_MESSAGS=5,
  CALLS=6,
  LOCATION=7,
  CONTACT=8,
  VOICE_NOTE =9,
}