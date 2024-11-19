import React, { useState } from "react";
import io from "socket.io-client";
import "./Chat.css";
import "./ChatForm.css";
import ChatWindow from "./ChatWindow";

const socket = io.connect();

function ChatRoom() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="chat-room">
      {!showChat ? (
        <div>
          <h3>Join a room</h3>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              className="form-control"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="room">Room ID:</label>
            <input
              type="text"
              id="room"
              className="form-control"
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
          </div>
          <button className="btn btn-primary" onClick={joinRoom}>
            Join a room
          </button>
        </div>
      ) : (
        <ChatWindow socket={socket} room={room} username={username} />
      )}
    </div>
  );
}

export default ChatRoom;
