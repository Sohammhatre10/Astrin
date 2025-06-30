import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: string;
}

export default function ChatAgent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "🌌 Greetings, cosmic explorer! I'm Astrin, your AI companion for all things space and astronomy. Ask me anything about planets, stars, galaxies, space missions, or the mysteries of the universe!",
      sender: "assistant",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const chatResponse = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      const chatData = await chatResponse.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: chatData.response,
        sender: "assistant",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => {
        const updatedMessages = [...prev, assistantMessage];
        saveChatHistory(updatedMessages);
        return updatedMessages;
      });
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "🌌 I'm experiencing some cosmic interference right now. My stellar communication systems are temporarily down, but I'll be back online soon! ✨",
        sender: "assistant",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveChatHistory = async (history: Message[]) => {
    try {
      await fetch("http://localhost:8000/api/chat/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(history),
      });
      console.log("Chat history saved successfully!");
    } catch (error) {
      console.error("Failed to save chat history:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Cosmic Chat Agent
          </h2>
          <p className="text-gray-400 text-lg">
            Ask Astrin anything about space, astronomy, and the universe
          </p>
        </div>

        <div className="glass-card rounded-lg p-6 h-96 flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "assistant" && (
                  <div className="p-2 rounded-full bg-cyan-400 bg-opacity-20">
                    <Bot className="w-5 h-5 text-cyan-400" />
                  </div>
                )}

                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-cyan-400 bg-opacity-20 text-cyan-100"
                      : "bg-purple-400 bg-opacity-20 text-purple-100"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-70">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>

                {message.sender === "user" && (
                  <div className="p-2 rounded-full bg-green-400 bg-opacity-20">
                    <User className="w-5 h-5 text-green-400" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="p-2 rounded-full bg-cyan-400 bg-opacity-20">
                  <Bot className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="bg-purple-400 bg-opacity-20 text-purple-100 px-4 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Loader className="w-4 h-4 animate-rotate" />
                    <span className="text-sm">Astrin is thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about stars, planets, space missions..."
              className="flex-1 bg-black bg-opacity-50 border border-gray-600 rounded-lg px-4 py-2 
                       text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 
                       focus:ring-1 focus:ring-cyan-400"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="bg-cyan-400 hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed
                       text-black px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
