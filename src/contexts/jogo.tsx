import { useRouter } from "expo-router";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useJogoFisica } from "@/contexts/jogoFisica";
import { type NiveisDificuldadeType, NiveisDificuldade } from "@/types";

export type EstadoJogo = "jogando" | "gameover" | "ganhou";

type JogoContexto = {
  nivel: NiveisDificuldadeType;
  obtemNomeNivel: string;
  estado: EstadoJogo;
  reinicio: number;
  aumentaNivelDificuldade: () => void;
  reIniciarJogo: (inicio: boolean) => void;
  finalizaJogo: () => void;
  ganhaJogo: () => void;
};

const JogoContext = createContext<JogoContexto | undefined>(undefined);

export const useJogo = () => {
  const context = useContext(JogoContext);
  if (!context) {
    throw new Error("useJogo must be used within ContextJogo provider");
  }
  return context;
};

export const ContextJogo: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { reset: resetFisica } = useJogoFisica();
  const [nivel, setNivel] = useState<NiveisDificuldadeType>(1);
  const [estado, setEstado] = useState<EstadoJogo>("jogando");
  const [reinicio, setReinicio] = useState(0);

  useEffect(() => {
    if (estado === "gameover") {
      router.replace("/perdeu");
      return;
    }

    if (estado === "ganhou") {
      router.replace("/ganhou");
      return;
    }
  }, [estado, router]);

  const aumentaNivelDificuldade = () => {
    setNivel(
      (prev) =>
        (prev + 1 > Object.keys(NiveisDificuldade).length
          ? 1
          : prev + 1) as NiveisDificuldadeType,
    );
  };

  const obtemNomeNivel = NiveisDificuldade[nivel];

  const finalizaJogo = useCallback(() => {
    setEstado("gameover");
  }, []);

  const ganhaJogo = useCallback(() => {
    setEstado("ganhou");
  }, []);

  const reIniciarJogo = useCallback(
    (inicio = false) => {
      resetFisica(nivel);
      setReinicio((valor) => valor + 1);
      setEstado("jogando");
      router.dismissAll();
      router.replace(inicio ? "/" : "/jogo");
    },
    [resetFisica, nivel, router],
  );

  const value = useMemo(
    () => ({
      nivel,
      obtemNomeNivel,
      estado,
      reinicio,
      aumentaNivelDificuldade,
      reIniciarJogo,
      ganhaJogo,
      finalizaJogo,
    }),
    [
      nivel,
      obtemNomeNivel,
      estado,
      reinicio,
      reIniciarJogo,
      ganhaJogo,
      finalizaJogo,
    ],
  );

  return <JogoContext.Provider value={value}>{children}</JogoContext.Provider>;
};
