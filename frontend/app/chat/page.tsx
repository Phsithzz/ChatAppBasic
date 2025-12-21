"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import { IoSend } from "react-icons/io5";
import { BiMessageDetail } from "react-icons/bi";

type Character = {
  name: string;
  color: string;
  image: StaticImageData;
};

type Message = {
  sender: string;
  text: string;
  image: StaticImageData;
  time: string;
};

const ChatRoom = ({ character }: { character: Character }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessage] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    <div className="flex flex-col">
      <Navbar character={character} />

      <div
        className="flex flex-col w-full max-w-4xl h-[80vh] 
      bg-gray-50 rounded-2xl shadow-xl 
      overflow-hidden border border-gray-200 mt-4 mx-auto"
      >
        <div className="flex-1 overflow-y-auto p-4 space-y-6 ">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center select-none opacity-60">
              <div className="bg-gray-100 p-6 rounded-full mb-4 animate-pulse">
                <BiMessageDetail size={60} />
              </div>

              <h1 className="text-gray-600 font-semibold text-lg">
                ยังไม่มีข้อความ
              </h1>

              <p className="text-gray-400 text-sm mt-1">เริ่มบทสนทนาได้เลย!</p>
            </div>
          ) : (
            <>
              {messages.map((msg) => {
                const isMe = msg.sender === character.name;

                return (
                  <div
                    key={`${msg.sender}-${msg.time}`} 
                    className={`flex w-full ${
                      isMe ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex max-w-[75%] gap-2 ${
                        isMe ? "flex-row-reverse" : "flex-row "
                      }`}
                    >
                      <div className="shrink-0  ">
                        <Image
                          src={msg.image}
                          alt={msg.sender}
                          width={45}
                          height={45}
                          className="rounded-full border border-gray-200 shadow-sm object-cover"
                        />
                      </div>

                      <div
                        className={`flex flex-col ${
                          isMe ? "items-end" : "items-start"
                        }`}
                      >
                        {!isMe && (
                          <span className="text-xs text-gray-400 ml-1 mb-1">
                            {msg.sender}
                          </span>
                        )}
                        <div className="flex flex-col">
<div
                          className={`
                            px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-md 
                            ${
                              isMe
                                ? `bg-${character.color}-600 text-white rounded-br-sm`
                                : "bg-white text-gray-800 border border-gray-100 rounded-bl-sm"
                            }
                          `}
                        >
                          {msg.text}

                          
                        </div>
                        <div
                            className={`mt-1 text-[10px] opacity-70 
                              ${isMe ? "text-right text-gray-400" : "text-left text-gray-400"}`}
                          >
                            {new Date(msg.time).toLocaleTimeString("th-TH", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                );
              })}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <div className="p-4 bg-white border-t border-gray-100">
          <div
            className="flex items-center gap-3 bg-[#EEEEEE] p-2 rounded-full 
          pr-2 focus-within:ring-2 focus-within:ring-blue-600 transition-all"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent px-4 py-2 text-md text-gray-700 placeholder-gray-400 focus:outline-none"
              placeholder={`พิมพ์ข้อความ...`}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className={`
                p-3 rounded-full transition-all duration-200
                ${
                  input.trim()
                    ? "bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:scale-105 active:scale-95 cursor-pointer"
                    : "bg-gray-300 text-gray-50 cursor-not-allowed"
                }
              `}
            >
              <IoSend size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
