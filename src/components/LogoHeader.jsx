import logo from "../assets/logo.png"
export default function LogoHeader() {
    return (
        <>
            <img src={logo} alt="iTechSeed Logo" className="h-40 mb-6 rounded-lg shadow-lg" />
            <div className="text-4xl font-extrabold tracking-widest text-center bg-gradient-to-r from-green-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg font-oswald">
                We change the world.
            </div>
        </>
    );
}