# Chat-Interface

This project is a real-time chat application built with Node.js, Socket.io, React, and SQLite3. It allows users to log in, join the chat, send messages, and view chat history. The app stores user data and messages in an SQLite3 database.

Features
->User Authentication: Users can log in by providing a username.
->Real-Time Messaging: Chat messages are sent and received in real time using Socket.io.
->Message Persistence: All messages are stored in an SQLite3 database, allowing users to see chat history when they join.
->User Presence: When a user joins, a notification is broadcasted to all connected users.
->Mobile and Desktop Support: The app is designed to work well on both desktop and mobile devices.

Technologies Used
Frontend: React.js
Backend: Node.js with Socket.io
Database: SQLite3 for storing user data and messages
Real-Time Communication: Socket.io
Styling: CSS and Bootstrap for layout and design
Prerequisites
Before you begin, ensure you have the following installed:

Node.js: Download Node.js
npm (comes with Node.js): npm Documentation
Installation
Follow these steps to set up the project locally.

1. Clone the Repository
Clone the repository to your local machine:
git clone https://github.com/shutupatul/Chat-Interface.git
cd Chat-Interface

3. Install Dependencies
Install the required dependencies for both the server and client.

For the backend (Node.js and Socket.io):
cd server
npm install
For the frontend (React.js):
cd client
npm install

3. Setup SQLite3 Database
The database is automatically created when the server starts, but you can manually set it up by running the server. If you want to change the database configuration or reset it, you can edit the server's SQLite3 configuration.

4. Run the Server
Start the server by navigating to the server folder and running the following command:
npm start
This will start the server on http://localhost:4000.

5. Run the Client
To start the React client, navigate to the client folder and run:
npm start
This will open the client in your browser at http://localhost:3000.

Usage
Open the React client in your browser.
Enter your username to log in.
Once logged in, you'll be able to send messages in the chat.
All users in the chat will receive the message in real time.
The chat history will be automatically retrieved from the SQLite3 database when a user joins.

