"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Character = {
  name: string;
  color: string;
  image: any;
};

type Message = {
  sender: string;
  text: string;
  image: any;
};
const ChatRoom = ({ character }: { character: Character }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessage] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");
    setSocket(ws);

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        setMessage((prev) => [...prev, msg]);
      } catch (err) {
        console.log(err);
      }
    };

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (socket && input.trim()) {
      const msg = {
        sender: character.name,
        text: input,
        image: character.image,
      };
      socket.send(JSON.stringify(msg));
      setInput("");
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-header">ห้องแชท </div>

      <div className="chat-messages">
        {messages.map((msg, i) => {
          const isMe = msg.sender === character.name;
          const colorClass =
            msg.sender === "Phoo"
              ? "bg-green-600"
              : msg.sender === "B"
              ? "bg-pink-500"
              : msg.sender === "C"
              ? "bg-orange-400"
              : "bg-gray-600";
          return (
            <div
              key={i}
              className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
            >
              <Image
                src={msg.image}
                alt={msg.sender}
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-sm text-gray-300 mb-2">{msg.sender}</span>
              <div
                className={`chat-message ${colorClass} ${
                  isMe ? "self-end" : "self-start"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chat-input"
          placeholder="พิมพ์ข้อความ"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="chat-button" onClick={sendMessage}>
          ส่ง
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
