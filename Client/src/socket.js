import { io } from "socket.io-client";

const options = {
  reconnect_attempt: "Infinity",
  // timeout: 10000,
  autoConnect: false,
  transports: ["websocket"],
};

export const socket = io("http://192.168.56.1:5000", options);
