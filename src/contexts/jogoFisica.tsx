import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type FC,
  type PropsWithChildren,
} from "react";
import { useSharedValue, type SharedValue } from "react-native-reanimated";

export type Tijolo = {
  x: number;
  y: number;
  largura: number;
  altura: number;
  visivel: boolean;
};

export type PaddleMovement = {
  isMovingLeft: SharedValue<boolean>;
  isMovingRight: SharedValue<boolean>;
};

export type JogoFisicaContexto = {
  bolaX: SharedValue<number>;
  bolaY: SharedValue<number>;
  velocidadeX: SharedValue<number>;
  velocidadeY: SharedValue<number>;
  paddleX: SharedValue<number>;
  areaLargura: SharedValue<number>;
  areaAltura: SharedValue<number>;
  tijolos: SharedValue<Tijolo[]>;
  paddleMovement: PaddleMovement;
  reset: () => void;
};

const JogoFisicaContext = createContext<JogoFisicaContexto | undefined>(
  undefined,
);

export const useJogoFisica = () => {
  const context = useContext(JogoFisicaContext);
  if (!context) {
    throw new Error(
      "useJogoFisica must be used within ContextJogoFisica provider",
    );
  }
  return context;
};

export const ContextJogoFisica: FC<PropsWithChildren> = ({ children }) => {
  const bolaX = useSharedValue(0);
  const bolaY = useSharedValue(0);
  const velocidadeX = useSharedValue(0);
  const velocidadeY = useSharedValue(0);
  const paddleX = useSharedValue(0);
  const areaLargura = useSharedValue(0);
  const areaAltura = useSharedValue(0);
  const tijolos = useSharedValue<Tijolo[]>([]);
  const isMovingLeft = useSharedValue(false);
  const isMovingRight = useSharedValue(false);

  const paddleMovement = useMemo(
    () => ({ isMovingLeft, isMovingRight }),
    [isMovingLeft, isMovingRight],
  );

  const reset = useCallback(() => {
    bolaX.value = 0;
    bolaY.value = 0;
    velocidadeX.value = 0;
    velocidadeY.value = 0;
    paddleX.value = 0;
    areaLargura.value = 0;
    areaAltura.value = 0;
    tijolos.value = [];
    isMovingLeft.value = false;
    isMovingRight.value = false;
  }, [
    bolaX,
    bolaY,
    velocidadeX,
    velocidadeY,
    paddleX,
    areaLargura,
    areaAltura,
    tijolos,
    isMovingLeft,
    isMovingRight,
  ]);

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
      paddleMovement,
      reset,
    }),
    [
      bolaX,
      bolaY,
      velocidadeX,
      velocidadeY,
      paddleX,
      areaLargura,
      areaAltura,
      tijolos,
      paddleMovement,
      reset,
    ],
  );

  return (
    <JogoFisicaContext.Provider value={value}>
      {children}
    </JogoFisicaContext.Provider>
  );
};
