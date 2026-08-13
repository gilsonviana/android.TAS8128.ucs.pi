import { type LayoutChangeEvent } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedView } from "@/components/themed-view";
import { BOLA_FACIL, PADDLE_FACIL } from "@/constants/grade";
import { BottomTabInset, Spacing } from "@/constants/theme";
import { useJogo } from "@/contexts/jogo";
import { useJogoFisica } from "@/contexts/jogoFisica";
import { Bola } from "@/pages/Jogo/components/Bola";
import { GradeFacil } from "@/pages/Jogo/components/GradeFacil";
import { Paddle } from "@/pages/Jogo/components/Paddle";

export const TelaJogo = () => {
  const { reinicio } = useJogo();
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
    paddleMovement,
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

  const tap = Gesture.Tap()
    .onStart((e) => {
      "worklet";
      const screenCenter = areaLargura.value / 2;
      if (e.x < screenCenter) {
        paddleMovement.isMovingLeft.value = true;
      } else {
        paddleMovement.isMovingRight.value = true;
      }
    })
    .onFinalize(() => {
      "worklet";
      paddleMovement.isMovingLeft.value = false;
      paddleMovement.isMovingRight.value = false;
    });

  const longPress = Gesture.LongPress()
    .minDuration(50)
    .onStart((e) => {
      "worklet";
      const screenCenter = areaLargura.value / 2;
      if (e.x < screenCenter) {
        paddleMovement.isMovingLeft.value = true;
      } else {
        paddleMovement.isMovingRight.value = true;
      }
    })
    .onFinalize(() => {
      "worklet";
      paddleMovement.isMovingLeft.value = false;
      paddleMovement.isMovingRight.value = false;
    });

  const combined = Gesture.Simultaneous(tap, longPress);

  return (
    <GestureDetector gesture={combined}>
      <ThemedView
        style={{ ...insetStyle, flex: 1, position: "relative" }}
        onLayout={onLayoutArea}
      >
        <GradeFacil key={reinicio} />
        <Bola />
        <Paddle />
      </ThemedView>
    </GestureDetector>
  );
};
