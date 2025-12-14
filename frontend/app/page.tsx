"use client";

import { useState } from "react";

import ChatRoom from "../app/chat/page"

import a from "../public/images/avatars/a.jpg";
import b from "../public/images/avatars/b.jpg";
import Image, { StaticImageData } from "next/image";

type Character = {
  name: string;
  color: string;
  image: StaticImageData
};

const ChatPage = () => {
  const [character, setCharacter] = useState<Character | null>(null);

  if (character) {
    return <ChatRoom character={character} />;
  }
  const characters:Character[] = [
    {
      name: "A",
      color: "blue",
      image: a,
    },
    {
      name: "B",
      color: "red",
      image: b,
    },
  ];

  return (
    <div
      className="
    flex flex-col items-center justify-center h-150  min-w-xl 
    bg-white rounded-xl shadow-2xl
     "
    >
      <h1
        className="
      text-black text-4xl font-bold mb-6"
      >
        เลือกตัวละครของคุณ
      </h1>
      <div
        className="
      flex flex-wrap gap-4 "
      >
        {characters.map((c) => (
          <div key={c.name} className="
          flex flex-col space-y-4 mx-6 
          ">
            <Image src={c.image} width={300} height={300} alt={c.name} 
            className={`rounded-full ring-4  ${c.color === "blue" ? "ring-blue-600" : "ring-red-600"}`}/>
             <button
            onClick={() => setCharacter(c)} 
            className={`
          px-6 py-3 rounded-2xl shadow-lg
          font-semibold text-lg text-white
          transition-all duration-200
          hover:scale-105 cursor-pointer
          ${c.color === "blue" ? "bg-blue-600 hover:bg-blue-700" : ""}
          ${c.color === "red" ? "bg-red-600 hover:bg-red-700" : ""}
          `}
          >
            {c.name}
          </button>
          </div>
         
        ))}
      </div>
    </div>
  );
};

export default ChatPage;
