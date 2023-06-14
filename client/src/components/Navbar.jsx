import React from "react";
import { Link } from "react-router-dom";
import { Link2 } from "lucide-react";

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-20 border-b border-gray-200 bg-white">
            <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between py-4 px-2">
                <div className="flex items-center">
                    <Link to="/dashboard" className="text-blue-500 font-semibold text-2xl flex items-center">
                        <Link2 className="mr-2" size={28} />
                        <span className="text-2xl">URL Shortener</span>
                    </Link>
                </div>
                <div>
                    <button className="border border-blue-500 text-blue-500 py-2 px-4 rounded-md mr-2 hover:bg-indigo-50">
                        Home
                    </button>
                    <button className="border border-blue-500 bg-blue-500 text-white py-2 px-4 hover:bg-blue-700 rounded-md">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
