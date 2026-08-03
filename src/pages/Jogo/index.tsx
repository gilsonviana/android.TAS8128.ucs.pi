import { View, type LayoutChangeEvent } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BottomTabInset, Spacing } from "@/constants/theme";
import { BOLA_FACIL, PADDLE_FACIL } from "@/constants/grade";
import { useJogoFisica } from "@/contexts/jogoFisica";
import { GradeFacil } from "@/pages/Jogo/components/GradeFacil";
import { Bola } from "@/pages/Jogo/components/Bola";
import { Paddle } from "@/pages/Jogo/components/Paddle";

export const TelaJogo = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const {
    bolaX,
    bolaY,
    velocidadeX,
    velocidadeY,
    paddleX,
    areaLargura,
    areaAltura,
    tijolos,
  } = useJogoFisica();

  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };

  const insetStyle = {
    paddingTop: insets.top,
    paddingLeft: insets.left,
    paddingRight: insets.right,
    paddingBottom: insets.bottom,
  };

  const onLayoutArea = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    areaLargura.value = width;
    areaAltura.value = height;

    if (bolaX.value === 0 && bolaY.value === 0) {
      bolaX.value = width / 2;
      bolaY.value = height - PADDLE_FACIL.ALTURA - BOLA_FACIL.RAIO * 2 - 40;
      velocidadeX.value = BOLA_FACIL.VELOCIDADE_INICIAL * 0.6;
      velocidadeY.value = -BOLA_FACIL.VELOCIDADE_INICIAL;
      paddleX.value = width / 2;
      tijolos.value = [];
    }
  };

  return (
    <View
      style={{ ...insetStyle, flex: 1, position: "relative" }}
      onLayout={onLayoutArea}
    >
      <GradeFacil />
      <Bola />
      <Paddle />
    </View>
  );
};
