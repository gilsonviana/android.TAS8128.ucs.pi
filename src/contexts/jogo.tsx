import { PropsWithChildren, createContext, useContext, useState } from "react";

import { type NiveisDificuldadeType, NiveisDificuldade } from "@/types";

type JogoContexto = {
  nivel: NiveisDificuldadeType;
  obtemNomeNivel: string;
  aumentaNivelDificuldade: () => void;
};

const JogoContext = createContext({} as JogoContexto);

export const useJogo = () => useContext(JogoContext);

export const ContextJogo: React.FC<PropsWithChildren> = ({ children }) => {
  const [nivel, setNivel] = useState<NiveisDificuldadeType>(1);

  const aumentaNivelDificuldade = () => {
    setNivel(
      (prev) =>
        (prev + 1 > Object.keys(NiveisDificuldade).length
          ? 1
          : prev + 1) as NiveisDificuldadeType,
    );
  };

  const obtemNomeNivel = NiveisDificuldade[nivel];

  return (
    <JogoContext.Provider
      value={{ nivel, obtemNomeNivel, aumentaNivelDificuldade }}
    >
      {children}
    </JogoContext.Provider>
  );
};
