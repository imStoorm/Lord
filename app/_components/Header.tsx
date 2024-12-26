import { FaBible } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Header = () => {
  return (
    <header className="bg-black text-white py-2">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-8 h-8" />
        </div>

        {/* Navigation Section */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer hover:text-gray-400">
            <GoHome className="text-xl" />
            <span className={inter.className}>Página inicial</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-gray-400">
            <FaBible className="text-xl" />
            <span className={inter.className}>Bíblia online</span>
          </div>
        </div>

        {/* Profile Section */}
        <div>
          <img
            src="/profile.png"
            alt="Profile"
            className="w-8 h-8 rounded-full cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
