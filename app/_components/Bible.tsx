"use client";

import localFont from "next/font/local";
import { ScrollArea } from "./ui/scroll-area";
import Versicle from "./Versicle";

const myFont = localFont({ src: "../fonts/Zodiak-Light.ttf" });
interface Texto {
  number: number;
  text: string;
}

interface BibleProps {
  livro: string;
  capitulo: number;
  versiculo: number;
  texto?: Texto[]; // Torna o className opcional
}

const Biblia = ({ livro, capitulo, versiculo, texto }: BibleProps) => {

  return (
    <>
    <ScrollArea className={`${myFont.className} w-[50%] flex mx-auto text-center text-white p-4 overflow-y-auto justify-center`}>
      {texto?.map((item) => (
        <Versicle key={item.number} number={item.number} text={item.text} />
      ))}
    </ScrollArea>
    </>
  );
};

export default Biblia;
