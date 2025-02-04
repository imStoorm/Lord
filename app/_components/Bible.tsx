"use client";

import localFont from "next/font/local";
import { ScrollArea } from "./ui/scroll-area";
import Versicle from "./Versicle";
import { MdOutlineContentCopy } from "react-icons/md";
import { Button } from "./ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const myFont = localFont({ src: "../fonts/Zodiak-Light.ttf" });

interface Texto {
  number: number;
  text: string;
}

interface BibleProps {
  livro: string;
  capitulo: number;
  versiculo: number;
  texto?: Texto[];
  align: string; // Torna o texto opcional
}

const Biblia = ({ livro, capitulo, versiculo, texto, align }: BibleProps) => {
  const [hoveredVerse, setHoveredVerse] = useState<number[]>([]);
  const { toast } = useToast()
  console.log(align)
  // Função para alternar o estado de isHovered
  const toggleHoveredVerse = (verseNumber: number) => {
    setHoveredVerse((prev) =>
      prev.includes(verseNumber)
        ? prev.filter((num) => num !== verseNumber)
        : [...prev, verseNumber]
    );
  };
  const handleCopy = () => {
    const selectedText = "\"" + texto?.filter((item) => hoveredVerse.includes(item.number)).map((item) => `${item.text}`).join(" ") + "\"\n\n" + `${livro} ${capitulo}:${hoveredVerse.sort()[0]}${hoveredVerse[1] ? `-${hoveredVerse.sort()[hoveredVerse.length - 1]}` : ""}`;

    if (selectedText) {
      navigator.clipboard.writeText(selectedText);
      toast({title: "Versículos copiados com sucesso!"});
    } else {
      toast({title: "Nenhum versículo selecionado."});
    }
  };

  return (
    <ScrollArea
      className={`${myFont.className} w-[50%] flex mx-auto text-${align} text-white p-4 overflow-y-auto justify-center`}
    >
      {texto?.map((item) => {
        const isHovered = hoveredVerse.includes(item.number);
        return (
          <>
            <div key={item.number} className={`relative group ${isHovered ? "bg-white bg-opacity-5" : ""}`} onClick={() => toggleHoveredVerse(item.number)}>
              <Versicle number={item.number} text={item.text} isHovered={isHovered} />
            </div>
            <div className={`relative group ${isHovered ? "bg-white bg-opacity-5" : ""}`}>
              {isHovered && item.number === hoveredVerse.sort()[hoveredVerse.length - 1] && (
                <Button
                  variant="ghost"
                  className="absolute top-0 right-0 bg-[#0f0f0f] hover:bg-[#1c1c1c] rounded-xl w-12 h-8 flex items-center justify-center z-10"
                  onClick={handleCopy}
                >
                  <MdOutlineContentCopy />
                </Button>
              )}
            </div>
          </>
        );
      })}
    </ScrollArea>
  );
};

export default Biblia;
