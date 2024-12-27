"use client";

import localFont from "next/font/local";
import { useState, useEffect } from "react";
import siglas from "../../public/siglas.json";
import biblia from "../../public/nvi.json";
import { ScrollArea } from "./ui/scroll-area";
import { getText } from "../_actions/get-text";
import Versicle from "./Versicle";

const myFont = localFont({ src: "../fonts/Zodiak-Light.ttf" });

const Biblia = () => {
  const [livro, setLivro] = useState("Gênesis");
  const [capitulo, setCapitulo] = useState(1);
  const [versiculo, setVersiculo] = useState(1);
  const [texto, setTexto] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadText = async () => {
        setLoading(true);
        const response = await getText({ livro, capitulo });
        setTexto(response);
        setLoading(false);
    };

    loadText();
  }, [livro, capitulo]);

  return (
    <div className="w-full h-[86%] flex items-center justify-center">
      <div className={`${myFont.className} text-center`}>
        <div className="flex gap-2 justify-center items-center mb-6">
          <h1 className="text-white text-3xl">{livro} {capitulo}</h1>
        </div>
        <div className=" w-[50%] h-[30%] mx-auto text-white p-4">
          {loading ? "Carregando..." : texto?.map((item) => (
            <Versicle key={item?.number} number={item?.number} text={item.text} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Biblia;
