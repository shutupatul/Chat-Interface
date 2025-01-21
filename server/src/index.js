import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import sqlite3 from "sqlite3";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3006"],
    methods: ["GET", "POST"]
  },
});

// Create/open the SQLite database
const db = new sqlite3.Database('./chatApp.db', (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("Database connected.");
  }
});

// Create tables if they don't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT,
      username TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT,
      username TEXT,
      message TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

let users = [];

// Middleware to handle user authentication
io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("Invalid Username"));
  }
  socket.username = username;
  socket.userId = uuidv4();

  // Insert user into SQLite database
  const query = `INSERT INTO users (userId, username) VALUES (?, ?)`;
  db.run(query, [socket.userId, socket.username], (err) => {
    if (err) {
      console.error("Error inserting user:", err);
    }
  });

  next();
});

// Handle connection event
io.on("connection", (socket) => {
  // Send previous messages to the newly connected user
  db.all("SELECT * FROM messages ORDER BY timestamp ASC", (err, rows) => {
    if (err) {
      console.error("Error retrieving messages:", err);
    } else {
      socket.emit("previous messages", rows); // Send messages to the client
    }
  });

  // Add user to the users array and broadcast users list
  users.push({
    userId: socket.userId,
    username: socket.username,
  });
  io.emit("users", users);

  // Emit session details to the connected user
  socket.emit("session", { userId: socket.userId, username: socket.username });

  // Handle new message event
  socket.on("new message", (message) => {
    if (typeof message === "string" && typeof socket.username === "string") {
      // Save the message to the database
      const query = `INSERT INTO messages (userId, username, message) VALUES (?, ?, ?)`;
      db.run(query, [socket.userId, socket.username, message], (err) => {
        if (err) {
          console.error("Error saving message:", err);
        }
      });

      // Broadcast the new message to all clients
      socket.broadcast.emit("new message", {
        userId: socket.userId,
        username: socket.username,
        message,
      });
    } else {
      console.error("Invalid message or username:", { message, username: socket.username });
    }
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.username} (${socket.userId})`);
    users = users.filter((user) => user.userId !== socket.userId);
    io.emit("users", users);
  });
});

console.log("Listening on port 4000...");
httpServer.listen(process.env.PORT || 4000);
