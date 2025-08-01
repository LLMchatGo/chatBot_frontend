import React, { useState } from "react";
import { API_BASE_URL } from "../config";

// Custom hook for Web Speech API
function useWebSpeech() {
    const [listening, setListening] = useState(false);

    const startListening = (onResult) => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('Speech recognition not supported');
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            onResult(transcript);
            setListening(false);
        };
        recognition.onerror = () => setListening(false);
        recognition.onend = () => setListening(false);
        recognition.start();
        setListening(true);
    };

    const speak = (text) => {
        const utter = new window.SpeechSynthesisUtterance(text);
        utter.lang = 'en-US';
        window.speechSynthesis.speak(utter);
    };

    return { listening, startListening, speak };
}

export default function CallModal({ onClose }) {
    const [isCalling, setIsCalling] = useState(false);
    const [conversation, setConversation] = useState([]); // { sender: 'user'|'bot', text: string }
    const { listening, startListening, speak } = useWebSpeech();

    const handleStartCall = () => {
        setIsCalling(true);
        setConversation([]);
        handleSpeak();
    };

    const handleStopCall = () => {
        setIsCalling(false);
        window.speechSynthesis.cancel();
    };

    const handleSpeak = () => {
        if (isCalling && !listening) {
            startListening(async (userText) => {
                setConversation(conv => [...conv, { sender: 'user', text: userText }]);
                // Send to backend for response
                try {
                    const response = await fetch(`${API_BASE_URL}/chatbot/chat`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ message: userText })
                    });
                    const data = await response.json();
                    const botText = data.output || data?.tool_result?.output || "Sorry, I didn't understand that.";
                    setConversation(conv => [...conv, { sender: 'bot', text: botText }]);
                    speak(botText);
                } catch (e) {
                    setConversation(conv => [...conv, { sender: 'bot', text: "Sorry, there was an error." }]);
                }
            });
        }
    };

    return (
        <div className="fixed inset-0 z-[3000] bg-black/40 flex items-center justify-center">
            <div className="relative bg-white rounded-2xl shadow-2xl min-w-[340px] min-h-[340px] flex flex-col items-center justify-center animate-fadeIn p-8 border border-green-100">
                <button onClick={onClose} className="absolute top-3 right-4 text-3xl text-green-400 bg-transparent rounded-full w-9 h-9 flex items-center justify-center hover:bg-green-50 transition">&times;</button>
                <div className="flex flex-col items-center mb-4">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-green-600">Voice Call Support</span>
                        <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A2 2 0 0020 6.382V5a2 2 0 00-2-2H6a2 2 0 00-2 2v1.382a2 2 0 00.447 1.342L9 10m6 0v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0H7" /></svg>
                    </div>
                    {/* <span className="text-green-500 font-semibold text-lg animate-pulse">Work in Progress</span> */}
                </div>
                {!isCalling ? (
                    <>
                        <div className="flex flex-col items-center mb-4">
                            {/* <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg text-xl font-bold mb-2 animate-bounce">Full Version Coming Soon!</div> */}
                            <div className="text-gray-500 text-center max-w-xs mb-2">We're working hard to bring you a seamless voice support experience. Stay tuned for exciting updates!</div>
                        </div>
                        <button onClick={handleStartCall} className="px-6 py-2 rounded-lg bg-green-500 text-white font-bold shadow hover:bg-green-600 transition">Call Support</button>
                    </>
                ) : (
                    <>
                        {/* <div className="w-full h-48 bg-gray-50 rounded-lg p-3 mb-3 overflow-y-auto flex flex-col gap-2 border border-green-100">
                            {conversation.map((msg, i) => (
                                <div key={i} className={`text-sm ${msg.sender === 'user' ? 'text-right text-blue-600' : 'text-left text-green-700'}`}>{msg.text}</div>
                            ))}
                            {listening && <div className="italic text-gray-400">Listening...</div>}
                        </div> */}
                        <div className="flex gap-2">
                            <button onClick={handleSpeak} disabled={listening} className="px-4 py-2 rounded-lg bg-blue-500 text-white font-bold shadow hover:bg-blue-600 transition disabled:opacity-50">Speak</button>
                            <button onClick={handleStopCall} className="px-4 py-2 rounded-lg bg-red-500 text-white font-bold shadow hover:bg-red-600 transition">End Call</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}