import { PropsWithChildren, createContext, useContext, useMemo } from "react";
import { useSharedValue, type SharedValue } from "react-native-reanimated";

export type Tijolo = {
  x: number;
  y: number;
  largura: number;
  altura: number;
  visivel: boolean;
};

type JogoFisicaContexto = {
  bolaX: SharedValue<number>;
  bolaY: SharedValue<number>;
  velocidadeX: SharedValue<number>;
  velocidadeY: SharedValue<number>;
  paddleX: SharedValue<number>;
  areaLargura: SharedValue<number>;
  areaAltura: SharedValue<number>;
  tijolos: SharedValue<Tijolo[]>;
};

const JogoFisicaContext = createContext<JogoFisicaContexto | undefined>(
  undefined
);

export const useJogoFisica = () => {
  const context = useContext(JogoFisicaContext);
  if (!context) {
    throw new Error(
      "useJogoFisica must be used within ContextJogoFisica provider"
    );
  }
  return context;
};

export const ContextJogoFisica: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const bolaX = useSharedValue(0);
  const bolaY = useSharedValue(0);
  const velocidadeX = useSharedValue(0);
  const velocidadeY = useSharedValue(0);
  const paddleX = useSharedValue(0);
  const areaLargura = useSharedValue(0);
  const areaAltura = useSharedValue(0);
  const tijolos = useSharedValue<Tijolo[]>([]);

  const value = useMemo(
    () => ({
      bolaX,
      bolaY,
      velocidadeX,
      velocidadeY,
      paddleX,
      areaLargura,
      areaAltura,
      tijolos,
    }),
    []
  );

  return (
    <JogoFisicaContext.Provider value={value}>
      {children}
    </JogoFisicaContext.Provider>
  );
};
