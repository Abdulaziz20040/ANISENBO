import React, { useState, useRef, useEffect } from "react";
import { IoHome, IoSendSharp } from "react-icons/io5";
import { FaPaperclip, FaSmile, FaCamera } from "react-icons/fa";
import Header from "../components/Header";
import axios from "axios"; // API uchun

import "../App.css";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [datamessage, setDataMessage] = useState([
    { id: 1, sender: "user1", text: "Hello!", timestamp: "10:00 AM" },
    {
      id: 2,
      sender: "current_user",
      text: "Hi! How are you?",
      timestamp: "10:01 AM",
    },
  ]);

  const messagesEndRef = useRef(null);
  const loggedInUser = "current_user"; // Logged in user nomi

  const profilImg =
    "https://i.pinimg.com/736x/0a/8a/f6/0a8af6ce1cc107f649fa529b423cbb4b.jpg";

  // Scroll to the bottom of chat on datamessage yangilansa
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [datamessage]);

  const sendMessage = async () => {
    if (message.trim()) {
      const newMessage = {
        sender: loggedInUser,
        text: message.trim(),
        timestamp: new Date().toLocaleTimeString(),
      };

      try {
        const response = await axios.post(
          "https://a510c4f98367eca1.mokky.dev/chat",
          newMessage
        );

        if (response.status === 200) {
          console.log("Message sent to API successfully.");
          setDataMessage((prev) => [...prev, newMessage]);
          setMessage(""); // Inputni tozalash
        } else {
          console.error("Error sending the message.");
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  };

  return (
    <div className="container mx-auto">
      <Header />
      <div className="mt-[60px] text-start text-lg">
        <div className="modalHeader flex gap-5">
          {/* Sidebar */}
          <div className="modal_leftHeader hidden sm:block mt-8">
            <button className="mt-4">
              <img
                className="rounded-full"
                src={profilImg}
                alt="Profile"
                style={{ width: "50px", height: "50px" }}
              />
            </button>
          </div>

          {/* Main Chat Body */}
          <div className="modalBody w-full mb-2">
            <div
              className="content  rounded-lg relative mt-10 overflow-hidden"
              style={{
                height: "660px",
                padding: "10px",
                background:
                  "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
              }}
            >
              {/* Messages Container */}
              <div
                className="scrollbar-hide overflow-y-auto pr-2 pb-10"
                style={{ height: "90%" }}
              >
                {datamessage.map((item) => (
                  <div
                    key={item.timestamp + Math.random()}
                    className={`message flex flex-col ${
                      item.sender === loggedInUser ? "items-end" : "items-start"
                    } mt-2`}
                  >
                    {item.sender !== loggedInUser && (
                      <div className="flex items-center gap-2">
                        <img
                          src={profilImg}
                          alt="User"
                          className="rounded-full"
                          style={{ width: "40px", height: "40px" }}
                        />
                        <p>{item.sender}</p>
                      </div>
                    )}
                    <div
                      className={`message-text rounded-lg p-3 ${
                        item.sender === loggedInUser
                          ? "bg-purple-400 text-white"
                          : "bg-gray-300 text-black"
                      } max-w-xs`}
                    >
                      {item.text}
                    </div>
                    <span
                      className={`text-xs mt-1 ${
                        item.sender === loggedInUser
                          ? "text-gray-300"
                          : "text-gray-600"
                      }`}
                    >
                      {item.timestamp}
                    </span>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="bg-gray-700 absolute bottom-5 left-4 right-4 p-2 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3 w-full">
                  <FaPaperclip className="text-xl text-white cursor-pointer" />
                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="rounded-full p-3 w-full border-none shadow-sm text-black"
                  />
                  <FaSmile className="text-xl text-white cursor-pointer" />
                  <FaCamera className="text-xl text-white cursor-pointer" />
                </div>
                <button onClick={sendMessage}>
                  <IoSendSharp className="text-3xl text-blue-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
