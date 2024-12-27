import Image from "next/image";
import Header from "../_components/Header";
import Biblia from "../_components/Bible";
import { ScrollArea } from "../_components/ui/scroll-area";

export default function Bible() {
  return (
    <div className="flex flex-col h-screen">
      {/* Cabeçalho fixo no topo */}
      <Header page="bible" className="sticky top-0 z-10" />

      {/* Área rolável com o conteúdo */}
      <ScrollArea className="flex-1 overflow-y-auto mt-10"> {/* mt-10 é para dar espaço abaixo do cabeçalho */}
        <Biblia />
      </ScrollArea>
    </div>
  );
}
