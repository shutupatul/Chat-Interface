import React, { useState, useEffect } from "react";
import Login from "./Login";
import Chat from "./Chat";

const Main = ({ socket }) => {
  const [newUser, setNewUser] = useState("");
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for updated users list
    socket.on("users", (users) => {
      const newMessages = users.map(({ userId, username }) => ({
        type: "userStatus",
        userId,
        username,
      }));
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
      setUsers(users);
    });

    // Listen for session details
    socket.on("session", ({ userId, username }) => {
      setUser({ userId, username });
    });

    // Listen for new messages
    socket.on("new message", ({ userId, username, message }) => {
      if (typeof message === "string" && typeof username === "string") {
        const newMessage = {
          type: "message",
          userId,
          username,
          message,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else {
        console.error("Invalid message or username received from server:", {
          userId,
          username,
          message,
        });
      }
    });

    // Listen for previous messages (chat history)
    socket.on("previous messages", (messages) => {
      setMessages(messages.map((msg) => ({
        type: "message",
        userId: msg.userId,
        username: msg.username,
        message: msg.message,
      })));
    });

    // Clean up listeners on unmount
    return () => {
      socket.off("users");
      socket.off("session");
      socket.off("new message");
      socket.off("previous messages");
    };
  }, [socket]);

  // Function to log in a new user
  const logNewUser = () => {
    if (newUser.trim()) {
      socket.auth = { username: newUser };
      socket.connect();
    }
  };

  // Function to send messages
  const sendMessage = () => {
    if (message.trim() && typeof user.username === "string") {
      socket.emit("new message", message);

      const newMessage = {
        type: "message",
        userId: user.userId,
        username: user.username,
        message,
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage(""); // Clear the input field after sending
    } else {
      console.error("Cannot send an empty message or invalid username:", {
        message,
        username: user.username,
      });
    }
  };

  return (
    <main className="content">
      <div className="container mt-3">
        {user.userId ? (
          <Chat
            user={user}
            message={message}
            messages={messages}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        ) : (
          <Login
            newUser={newUser}
            setNewUser={setNewUser}
            logNewUser={logNewUser}
          />
        )}
      </div>
    </main>
  );
};

export default Main;
