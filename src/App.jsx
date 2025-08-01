import React, { useState } from "react";
import { FaComments, FaEnvelope, FaPhone, FaPaperPlane, FaBox, FaCreditCard, FaUndo, FaUser, FaTruck, FaQuestionCircle, FaLeaf } from "react-icons/fa";
import FloatingButtons from "./components/FloatingButtons";
import CallModal from "./components/CallModal";
import { API_BASE_URL } from "./config";

const supportCategories = [
  { icon: <FaBox className="text-gray-600" />, label: "Orders & Shipping", count: 12 },
  { icon: <FaCreditCard className="text-gray-600" />, label: "Payment & Billing", count: 8 },
  { icon: <FaUndo className="text-gray-600" />, label: "Returns & Refunds", count: 15 },
  { icon: <FaUser className="text-gray-600" />, label: "Account Issues", count: 6 },
  { icon: <FaTruck className="text-gray-600" />, label: "Delivery Problems", count: 9 },
  { icon: <FaQuestionCircle className="text-gray-600" />, label: "General Questions", count: 20 },
];

const tabs = [
  { label: "Live Chat", value: "chat" },
  { label: "Create Ticket", value: "ticket" },
  { label: "FAQ", value: "faq" },
  { label: "My Tickets", value: "status" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("chat");
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [thinking, setThinking] = useState(false);
  const [callOpen, setCallOpen] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages([...messages, { sender: "user", text: chatMessage, time: userTime }]);
    setChatMessage("");
    setThinking(true);
    try {
      const response = await fetch(`${API_BASE_URL}/chatbot/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: chatMessage })
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      const data = await response.json();
      const botText = data.output || data?.tool_result?.output || "Sorry, I didn't understand that.";
      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages(msgs => ([...msgs, { sender: "bot", text: botText, time: botTime }]));
    } catch (error) {
      console.error("API Error:", error);
      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages(msgs => ([...msgs, { sender: "bot", text: `Error: ${error.message}. Please check the API URL configuration.`, time: botTime }]));
    } finally {
      setThinking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 flex flex-col items-center">
          <div className="flex items-center gap-2 justify-center">
            <h1 className="text-3xl font-bold text-gray-900">Customer Support</h1>
            <h1 className="text-3xl font-bold text-green-500">iTechSeed</h1>
            <FaLeaf className="text-green-500 text-4xl -ml-2" />
          </div>
          <p className="text-gray-600">We're here to help you with any questions or concerns</p>
        </div>

        {/* Support Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow cursor-pointer p-6 text-center border border-gray-100">
            <FaComments className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
            <p className="text-gray-600 text-sm mb-4">Get instant help from our support team</p>
            <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">Online</span>
          </div>
          <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow cursor-pointer p-6 text-center border border-gray-100">
            <FaEnvelope className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Email Support</h3>
            <p className="text-gray-600 text-sm mb-4">Send us a detailed message</p>
            <span className="inline-block bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">24h response</span>
          </div>
          <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow cursor-pointer p-6 text-center border border-gray-100">
            <FaPhone className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Phone Support</h3>
            <p className="text-gray-600 text-sm mb-4">Call us at (555) 123-4567</p>
            <span className="inline-block bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">Mon-Fri 9AM-6PM</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6">
          <div className="flex border-b border-gray-200 mb-6">
            {tabs.map(tab => (
              <button
                key={tab.value}
                className={`px-6 py-2 -mb-px font-medium border-b-2 transition-colors ${activeTab === tab.value ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-gray-500 hover:text-blue-600'}`}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Panel */}
            <div className="lg:col-span-2">
              {activeTab === "chat" && (
                <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
                  <div className="mb-4">
                    <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-1"><FaComments className="h-5 w-5" /> Live Chat</h2>
                    <p className="text-gray-500 text-sm">Chat with our support team in real-time</p>
                  </div>
                  {/* Chat Messages */}
                  <div className="h-64 bg-gray-50 rounded-lg p-4 overflow-y-auto space-y-3">
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                        {msg.sender === 'bot' && (
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">S</div>
                        )}
                        <div className={`${msg.sender === 'user' ? 'order-2' : ''}`}> {/* user avatar on right */}
                          <div className={`rounded-lg p-3 shadow-sm max-w-xs ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-gray-900'}`}>
                            <p className="text-sm">{msg.text}</p>
                            <span className={`text-xs ${msg.sender === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>{msg.time}</span>
                          </div>
                        </div>
                        {msg.sender === 'user' && (
                          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm font-medium">U</div>
                        )}
                      </div>
                    ))}
                    {thinking && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">S</div>
                        <div className="rounded-lg p-3 shadow-sm max-w-xs bg-white text-gray-900 italic animate-pulse">
                          Thinking...
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Chat Input */}
                  <form className="flex gap-2 mt-4" onSubmit={handleSend}>
                    <input
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                      placeholder="Type your message..."
                      value={chatMessage}
                      onChange={e => setChatMessage(e.target.value)}
                    />
                    <button type="submit" className="flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white font-bold shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition">
                      <FaPaperPlane className="text-lg" />
                    </button>
                  </form>
                </div>
              )}
              {/* Other tabs (Create Ticket, FAQ, My Tickets) can be implemented here */}
              {activeTab !== "chat" && (
                <div className="bg-white rounded-xl shadow p-6 border border-gray-100 text-gray-400 text-center">
                  <p>This tab is for demo purposes. Only Live Chat is interactive.</p>
                </div>
              )}
            </div>
            {/* Sidebar */}
            <div>
              <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
                <h3 className="font-semibold text-lg mb-2">Quick Help</h3>
                <p className="text-gray-500 text-sm mb-4">Browse common topics</p>
                <div className="space-y-2">
                  {supportCategories.map((cat, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        {cat.icon}
                        <span className="text-sm font-medium">{cat.label}</span>
                      </div>
                      <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">{cat.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FloatingButtons onChat={undefined} onCall={() => setCallOpen(true)} />
      {callOpen && <CallModal onClose={() => setCallOpen(false)} />}
    </div>
  );
}

