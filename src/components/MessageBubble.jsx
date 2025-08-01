export default function MessageBubble({ sender, text }) {
    if (sender === "user") {
        return (
            <div className="flex flex-row-reverse items-end gap-2">
                <div className="max-w-[80%] px-5 py-3 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-400 text-white font-medium shadow-lg">
                    {text}
                </div>
            </div>
        );
    }
    // Bot message
    return (
        <div className="flex items-end gap-2">
            <img src="/bot-avatar.png" alt="Bot" className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-cyan-400 border-2 border-zinc-900 shadow" />
            <div className="max-w-[80%] px-5 py-3 rounded-2xl bg-zinc-700 text-green-100 font-medium shadow-lg">
                {text}
            </div>
        </div>
    );
}