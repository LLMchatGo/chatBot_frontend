export default function FloatingButtons({ onCall }) {
    return (
        <div className="fixed right-8 bottom-8 flex flex-col items-end z-[1100]">
            <button
                onClick={onCall}
                className="w-14 h-14 bg-zinc-900 rounded-full shadow-lg flex items-center justify-center mb-2 transition hover:scale-110 hover:shadow-2xl"
            >
                {/* Call icon SVG */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
        </div>
    );
}