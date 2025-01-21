import React from "react";

const ChatInput = ({ message, setMessage, sendMessage }) => {
  return (
    <div className="mt-auto align-items-end border-info py-3 px-4 border-top d-lg-block chat-input">
      <div className="input-group flex-fill">
        <input
          type="text"
          className="form-control"
          name="message"
          value={message}
          placeholder="Type your message here..."
          onChange={({ currentTarget: input }) => setMessage(input.value)} // Update message state
          onKeyDown={(e) => e.code === "Enter" && message.trim() && sendMessage()} // Send on Enter
        />
        <button
          className="btn btn-info"
          onClick={() => message.trim() && sendMessage()} // Send on button click
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
