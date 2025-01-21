import React from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatContainer from "./ChatContainer";
import manImage from "../images/man.png";
import ScrollableFeed from "react-scrollable-feed";

const Chat = ({ user, message, messages, setMessage, sendMessage }) => {
  return (
    <ChatContainer>
      <ChatHeader user={user} />
      <div className="position-relative chat-height overflow-auto">
        <ScrollableFeed>
          <div className="d-flex flex-column p-4">
            {messages.map((msg, index) => {
  if (msg.type === "userStatus") {
    return (
      <div key={index} className="text-center">
        <span className="badge bg-info">
          {msg.userId === user.userId
            ? "You have joined!"
            : `${msg.username} has joined!`}
        </span>
      </div>
    );
  } else {
    return (
      <div
        key={index}
        className={
          msg.userId === user.userId
            ? "chat-message-right pb-4"
            : "chat-message-left pb-4"
        }
      >
        <div>
          <img
            src={manImage}
            alt={msg.username || "Unknown User"} // Ensure a fallback for undefined
            className="rounded-circle mr-1"
            title={msg.username || "Unknown User"}
            width="40"
            height="40"
          />
          <div className="text-muted small text-nowrap mt-2">12:00AM</div>
        </div>
        <div className="flex-shrink-1 bg-light rounded py-1 px-3 ml-3">
          <div className="font-weight-bold mb-1">
            {msg.userId === user.userId ? "You" : msg.username}
          </div>
          <div>{msg.message}</div> {/* Ensure you're rendering only the message */}
        </div>
      </div>
    );
  }
})}

          </div>
        </ScrollableFeed>
      </div>
      <ChatInput
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </ChatContainer>
  );
};

export default Chat;
