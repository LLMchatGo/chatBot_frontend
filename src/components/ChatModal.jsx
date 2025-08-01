import React, { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import { FaPaperPlane } from "react-icons/fa";
import { API_BASE_URL } from "../config";

export default function ChatModal({ onClose }) {
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hello! How can I help you today?", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    const [input, setInput] = useState("");
    const [thinking, setThinking] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setMessages((msgs) => [...msgs, { sender: "user", text: input, time: now }]);
        setInput("");
        setThinking(true);

        try {
            const response = await fetch(`${API_BASE_URL}/chatbot/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: input }),
            });
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            const botText = data?.tool_result?.output || "Sorry, I didn't understand that.";
            const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setMessages((msgs) => [
                ...msgs,
                { sender: "bot", text: botText, time: botTime }
            ]);
        } catch (error) {
            const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setMessages((msgs) => [
                ...msgs,
                { sender: "bot", text: "Sorry, there was an error. Please try again later.", time: botTime }
            ]);
        } finally {
            setThinking(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[3000] bg-black/30 flex items-center justify-center">
            <div className="relative bg-white rounded-2xl shadow-2xl border border-zinc-200 w-full max-w-lg h-[80vh] flex flex-col animate-fadeIn">
                {/* Header */}
                <div className="flex items-center gap-3 px-6 py-4 border-b border-zinc-200">
                    <span className="text-2xl font-bold text-zinc-800">Live Chat</span>
                    <button onClick={onClose} className="ml-auto text-3xl text-zinc-400 bg-transparent rounded-full w-9 h-9 flex items-center justify-center hover:bg-zinc-100 focus:bg-zinc-200 transition">&times;</button>
                </div>
                {/* Chat history */}
                <div id="chat-history" className="flex-1 overflow-y-auto px-6 py-4 bg-white flex flex-col gap-3" style={{ minHeight: 0, maxHeight: 'calc(80vh - 140px)' }}>
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                            {msg.sender === "bot" && (
                                <img src="/bot-avatar.png" alt="Bot" className="w-8 h-8 rounded-full mr-2 self-end bg-gradient-to-br from-green-500 to-cyan-400 border-2 border-white shadow" />
                            )}
                            <div className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                                <div className={`px-4 py-2 rounded-2xl shadow text-sm font-medium ${msg.sender === "user" ? "bg-blue-600 text-white" : "bg-zinc-100 text-zinc-800"}`}>{msg.text}</div>
                                <span className="text-xs text-zinc-400 mt-1">{msg.time}</span>
                            </div>
                        </div>
                    ))}
                    {thinking && (
                        <div className="flex items-end gap-2">
                            <img src="/bot-avatar.png" alt="Bot" className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-cyan-400 border-2 border-white shadow" />
                            <div className="max-w-[80%] px-4 py-2 rounded-2xl bg-zinc-100 text-zinc-800 font-medium shadow italic animate-pulse">
                                Thinking...
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
                {/* Input */}
                <form id="chat-form" onSubmit={handleSubmit} className="flex gap-2 px-6 py-4 bg-white border-t border-zinc-200 rounded-b-2xl">
                    <input
                        id="user-input"
                        type="text"
                        className="flex-1 px-4 py-2 rounded-lg border border-zinc-300 bg-white text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                        placeholder="Type your message..."
                        autoComplete="off"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        required
                    />
                    <button type="submit" className="flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white font-bold shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition">
                        <FaPaperPlane className="text-lg" />
                    </button>
                </form>
            </div>
        </div>
    );
}