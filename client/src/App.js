import { useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import Chat from './Chat';
const socket = io.connect("http://localhost:3001");

function App() {

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChats] = useState(false);

  const joinRoom = () => {

    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChats(true);
    }

  };

  return (
    <div className="App">
      {!showChat ?(
      <div className="joinChatContainer">
        <h3>Join a Chat</h3>
        <input type="text" placeholder="Name..." onChange={(event) => {
          setUsername(event.target.value);
        }}
        />
        <input type="text" placeholder="Room ID..." onChange={(event) => {
          setRoom(event.target.value);
        }}
        />
        <button onClick={joinRoom}>Join a Chat-Room</button>
      </div>
      )
     :( 
      <Chat socket={socket} username={username} room={room} />
     )}
    </div>
  );
}

export default App;
