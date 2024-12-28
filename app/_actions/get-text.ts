type Siglas = {
    [key: string]: { nome: string; capitulos: number };
  };
  
const siglas: Siglas = require("../../public/siglas.json");
import biblia from "../../public/nvi.json";

interface GetTextParams {
  livro: string;
  capitulo: number;
}

interface Versiculo {
  number: number;
  text: string;
}

export const getText = async (params: GetTextParams): Promise<Versiculo[]> => {
  const { livro, capitulo } = params;

  const siglaLivro = Object.keys(siglas).find(
    (key) => siglas[key].nome === livro
  );

  if (siglaLivro) {
    const textoCapitulo = biblia.find(
      (item) => item.abbrev === siglaLivro
    )?.chapters[capitulo - 1];

    if (textoCapitulo) {
      return textoCapitulo.map((e, key): Versiculo => ({
        number: key + 1,
        text: e,
      }));
    } else {
      return [{ number: 0, text: "Texto não encontrado." }];
    }
  }

  return [{ number: 0, text: "Livro não encontrado." }];
};
