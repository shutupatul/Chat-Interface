import React from 'react';
import manImage from '../images/man.png';

const ChatHeader = ({ user }) => {
  return (
    <div className="align-items-start py-2 px-4 w-100 border-bottom border-info d-lg-block sticky-top bg-white">
      <div className="d-flex align-items-center py-1">
        <div className="position-relative">
          <img
            src={manImage}
            alt={user.username || "Unknown User"} // Ensure a fallback
            className="rounded-circle mx-2"
            width="40"
            height="40"
          />
        </div>
        <div className="flex-grow-1">
          <strong>Logged in as {user.username || "Unknown User"}</strong> {/* Ensure a fallback */}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;