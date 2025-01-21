import React from 'react';

const ChatContainer = (props)=>{
    return(
        <div className="card border-2 border-info w-100">
            <div className="row vh-95">
              <div className="d-flex flex-column col-12-lg-12 col-xl-12 chat-window">
                {props.children}
              </div>
            </div>
          </div>
    );
}; 

export default ChatContainer;