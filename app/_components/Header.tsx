import { FaBible } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { Inter } from "next/font/google";
import { Button } from "./ui/button";
import Link from "next/link";
import DynamicAvatar from "./Avatar";

const inter = Inter({ subsets: ["latin"] });

interface HeaderProps {
  page: string;
  className?: string; // Torna o className opcional
}
const Header = ({ page, className }: HeaderProps) => {

  return (
    <header className={`${className} text-white py-2 my-7`}>
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-full h-12"/>
        </div>

        {/* Navigation Section */}
        <div className="flex items-center gap-6">
            <Button className={`flex items-center gap-2 cursor-pointer ${page === "home" ? "text-gray-400" : "text-white"} hover:text-gray-400`} variant="ghost" asChild>
                <Link href={"/"}>
                    <GoHome className="text-xl" />
                    <span className={inter.className}>Página inicial</span>
                </Link>
            </Button>
            <Button className={`flex items-center gap-2 cursor-pointer ${page === "bible" ? "text-gray-400" : "text-white"} hover:text-gray-400`} variant="ghost" asChild>
                <Link href={"/biblia"}>
                <FaBible className="text-xl" />
                <span className={inter.className}>Bíblia online</span>
                </Link>
            </Button>
        </div>
        {/* Profile Section */}
        <div>
            <DynamicAvatar />
        </div>
      </div>
    </header>
  );
};

export default Header;
