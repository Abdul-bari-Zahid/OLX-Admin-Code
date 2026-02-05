import { io } from "socket.io-client";

const API = "http://localhost:3002";

// Get token from localStorage for socket authentication
const getToken = () => typeof window !== 'undefined' ? localStorage.getItem('token') : null;

export const socket = io(API, {
  transports: ["websocket"],
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
  auth: {
    token: getToken()
  }
});

// Connection events
socket.on("connect", () => {
  console.log("✅ Admin Socket connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("❌ Admin Socket disconnected:", reason);
});

socket.on("connect_error", (error) => {
  console.error("⚠️ Admin Socket connection error:", error);
});

// Identify user after connection
socket.on("connect", () => {
  const userId = localStorage.getItem('userId');
  if (userId) {
    socket.emit('identify', userId);
  }
});

export default socket;
