"use client";

import Header from "../_components/Header";
import Biblia from "../_components/Bible";
import { useEffect, useState } from "react";
import { getText } from "../_actions/get-text";
import localFont from "next/font/local";
import { Button } from "../_components/ui/button";
import { Inter } from "next/font/google";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../_components/ui/select";
import siglas from "../../public/siglas.json";

interface LivroInfo {
  nome: string;
  capitulos: number;
}

type SiglasType = Record<string, LivroInfo>;

const siglasData = siglas as SiglasType;

const myFont = localFont({ src: "../fonts/Zodiak-Light.ttf" });

const inter = Inter({ subsets: ["latin"] });
interface Texto {
  number: number;
  text: string;
}
export default function Bible() {
  const [livro, setLivro] = useState("Gênesis");
  const [capitulo, setCapitulo] = useState(1);
  const [versiculo, setVersiculo] = useState(1);
  const [texto, setTexto] = useState<Texto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const livros = Object.entries(siglasData);

  const getNumeroCapitulos = (): number => {
    const livroSigla = Object.keys(siglasData).find(
      (key) => siglasData[key].nome === livro
    );
    return livroSigla ? siglasData[livroSigla].capitulos : 1;
  };

  console.log(capitulo, getNumeroCapitulos(), capitulo >= getNumeroCapitulos());

  useEffect(() => {
    const loadText = async () => {
      setLoading(true);
      try {
        const response = await getText({ livro, capitulo });
        setTexto(response);
      } catch (error) {
        console.error("Erro ao carregar o texto:", error);
      } finally {
        setLoading(false);
      }
    };
    loadText();
  }, [livro, capitulo]);
  return (
    <div className="flex flex-col h-screen">
      <Header page="bible" className="sticky top-0 z-10" />

      <div
        className={`w-[50%] h-[8%] mx-auto flex gap-3 items-center justify-between text-white p-4 border-b border-gray-300 relative`}
      >
        <div className="flex-1" />
        <h1
          className={`${myFont.className} text-white text-3xl absolute left-1/2 transform -translate-x-1/2`}
        >
          {livro} {capitulo}
        </h1>
        <Select
          onValueChange={(value) => {
            const nomeLivro = siglasData[value as keyof SiglasType].nome;
            setLivro(nomeLivro);
            setCapitulo(1);
          }}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder={livro} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Livros</SelectLabel>
              {livros.map(([sigla, dados]) => (
                <SelectItem key={sigla} value={sigla}>
                  {dados.nome}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setCapitulo(Number(value))}>
          <SelectTrigger className="w-[70px]">
            <SelectValue placeholder={capitulo} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Capítulos</SelectLabel>
              {Array.from(
                { length: getNumeroCapitulos() },
                (_, i) => i + 1
              ).map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-grow flex flex-col items-center justify-between overflow-y-auto">
        {loading ? (
          <p className="text-white mt-4">Carregando...</p>
        ) : (
          <Biblia
            livro={livro}
            capitulo={capitulo}
            versiculo={versiculo}
            texto={texto}
          />
        )}

        <div className="flex justify-center my-10 gap-10">
          <Button
            className={`${inter.className} items-center cursor-pointer text-white hover:text-gray-400 disabled:opacity-50`}
            variant="outline"
            onClick={() => setCapitulo((prev) => Math.max(prev - 1, 1))}
            disabled={capitulo <= 1}
          >
            <h1>Capítulo Anterior</h1>
          </Button>
          <Button
            className={`${inter.className} items-center cursor-pointer text-white hover:text-gray-400 disabled:opacity-50`}
            variant="outline"
            disabled={capitulo >= getNumeroCapitulos()}
            onClick={() => {capitulo >= getNumeroCapitulos() ? null : setCapitulo((prev) => prev + 1)}}
          >
            <h1>Próximo Capítulo</h1>
          </Button>
        </div>
      </div>
    </div>
  );
}
