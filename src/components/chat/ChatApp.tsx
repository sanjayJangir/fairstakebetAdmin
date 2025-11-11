import { useState } from "react";
import userImage from "/src/assets/images/profile/user-1.jpg"; // Replace with any image from your project
import userImage2 from "/src/assets/images/profile/user-2.jpg"; // Replace with any image from your project
import userImage3 from "/src/assets/images/profile/user-3.jpg"; // Replace with any image from your project

const ChatApp = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "user", content: "Hello, how can I help you?", time: "10:00 AM" },
    { id: 2, sender: "admin", content: "I need assistance with my account.", time: "10:02 AM" },
    { id: 3, sender: "user", content: "Sure, what seems to be the issue?", time: "10:05 AM" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages([
      ...messages,
      { id: messages.length + 1, sender: "admin", content: newMessage, time: "10:10 AM" },
    ]);
    setNewMessage("");
  };

  const chatUsers = [
    { id: 1, image: userImage, unreadCount: 3 },
    { id: 2, image: userImage2, unreadCount: 5 },
    { id: 3, image: userImage3, unreadCount: 2 },
  ];

  return (
    <div className="w-full">
      {/* List of Chat Users */}
      <div className="flex gap-4 mb-6 overflow-x-auto">
        {chatUsers.map((user) => (
          <div
            key={user.id}
            className="relative w-[100px] h-[100px] rounded-[12px] bg-gray-100 dark:bg-darkgray shadow-md flex items-center justify-center"
          >
            <img
              src={user.image}
              alt={`User ${user.id}`}
              className="h-[80px] w-[80px] rounded-full"
            />
            {user.unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {user.unreadCount}
              </span>
            )}
          </div>
        ))}
      </div>
      {/* Chat Card */}
      <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
        <h5 className="card-title mb-6">Admin Chat</h5>
        {/* Chat Messages */}
        <div className="max-h-[400px] overflow-y-auto mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "admin" ? "justify-start" : "justify-end"
              } mb-4`}
            >
              {message.sender === "user" && (
                <img
                  src={userImage}
                  alt="User"
                  className="h-10 w-10 rounded-full mr-3"
                />
              )}
              <div
                className={`${
                  message.sender === "admin"
                    ? "bg-primary text-white"
                    : "bg-gray-100 dark:bg-darkgray text-gray-800"
                } p-4 rounded-lg max-w-[70%]`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs text-gray-400 mt-1 text-right">{message.time}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Input Field */}
        <div className="flex items-center">
          <input
            type="text"
            className="flex-1 border border-gray-300 dark:border-darkborder rounded-lg p-2 mr-2"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="bg-primary text-white px-4 py-2 rounded-lg"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;