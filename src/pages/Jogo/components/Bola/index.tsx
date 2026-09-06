import { getBolaConfig, getPaddleConfig } from "@/constants/grade";
import { useJogo } from "@/contexts/jogo";
import { useJogoFisica } from "@/contexts/jogoFisica";
import { useTheme } from "@/hooks/use-theme";
import { StyleSheet } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useFrameCallback,
} from "react-native-reanimated";

export const Bola: React.FC = () => {
  const { Colors } = useTheme();
  const { estado, finalizaJogo, nivel } = useJogo();
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
  const bolaConfig = getBolaConfig(nivel);
  const paddleConfig = getPaddleConfig(nivel);

  useFrameCallback((frameInfo) => {
    "worklet";
    if (areaLargura.value === 0 || areaAltura.value === 0) {
      return;
    }

    let vx = velocidadeX.value;
    let vy = velocidadeY.value;

    if (estado === "gameover" || (vx === 0 && vy === 0)) {
      return;
    }

    // Teto no dt: sem ele, um engasgo do JS produz um passo de centenas de px.
    const dt = Math.min((frameInfo.timeSincePreviousFrame ?? 16) / 1000, 1 / 30);
    const raio = bolaConfig.RAIO;
    const anteriorX = bolaX.value;
    const anteriorY = bolaY.value;

    // Trajeto real do frame. A varredura de tijolos abaixo só é correta se este
    // segmento não for alterado pelos clamps de parede/raquete, por isso ela
    // roda antes deles.
    const deslocamentoX = vx * dt;
    const deslocamentoY = vy * dt;
    let novoX = anteriorX + deslocamentoX;
    let novoY = anteriorY + deslocamentoY;

    const tijolosAtual = tijolos.value;
    let melhorIndice = -1;
    let melhorTempo = Infinity;
    let melhorEixoX = false;

    for (let i = 0; i < tijolosAtual.length; i++) {
      const t = tijolosAtual[i];
      if (!t || !t.visivel) continue;

      const limiteEsquerdo = t.x - raio;
      const limiteDireito = t.x + t.largura + raio;
      const limiteSuperior = t.y - raio;
      const limiteInferior = t.y + t.altura + raio;

      let entradaX = -Infinity;
      let saidaX = Infinity;
      let entradaY = -Infinity;
      let saidaY = Infinity;

      if (deslocamentoX === 0) {
        if (anteriorX < limiteEsquerdo || anteriorX > limiteDireito) {
          continue;
        }
      } else {
        const tempo1 = (limiteEsquerdo - anteriorX) / deslocamentoX;
        const tempo2 = (limiteDireito - anteriorX) / deslocamentoX;
        entradaX = Math.min(tempo1, tempo2);
        saidaX = Math.max(tempo1, tempo2);
      }

      if (deslocamentoY === 0) {
        if (anteriorY < limiteSuperior || anteriorY > limiteInferior) {
          continue;
        }
      } else {
        const tempo1 = (limiteSuperior - anteriorY) / deslocamentoY;
        const tempo2 = (limiteInferior - anteriorY) / deslocamentoY;
        entradaY = Math.min(tempo1, tempo2);
        saidaY = Math.max(tempo1, tempo2);
      }

      const tempoEntrada = Math.max(entradaX, entradaY);
      const tempoSaida = Math.min(saidaX, saidaY);

      if (tempoEntrada > tempoSaida || tempoEntrada > 1 || tempoSaida < 0) {
        continue;
      }

      // Guarda o primeiro contato no tempo, não o de menor índice no array.
      if (tempoEntrada < melhorTempo) {
        melhorTempo = tempoEntrada;
        melhorIndice = i;
        melhorEixoX = entradaX > entradaY;
      }
    }

    if (melhorIndice >= 0) {
      const alvo = melhorIndice;
      tijolos.modify((lista) => {
        "worklet";
        const copia = [...lista];
        const t = copia[alvo];
        if (t) {
          copia[alvo] = { ...t, visivel: false };
        }
        return copia;
      });

      // Recua até o ponto de contato. Se a bola já começou o frame dentro do
      // tijolo (tempo negativo), mantém a posição integrada e só inverte.
      if (melhorTempo >= 0) {
        novoX = anteriorX + deslocamentoX * melhorTempo;
        novoY = anteriorY + deslocamentoY * melhorTempo;
      }

      if (melhorEixoX) {
        vx = -vx;
      } else {
        vy = -vy;
      }
    }

    // Clamps usam atribuição direcional para que uma inversão no tijolo acima
    // não seja desfeita por uma segunda inversão na parede no mesmo frame.
    if (novoX - raio < 0) {
      novoX = raio;
      vx = Math.abs(vx);
    } else if (novoX + raio > areaLargura.value) {
      novoX = areaLargura.value - raio;
      vx = -Math.abs(vx);
    }

    if (novoY - raio < 0) {
      novoY = raio;
      vy = Math.abs(vy);
    }

    const paddleY = areaAltura.value - paddleConfig.ALTURA;
    const dentroPaddleX =
      novoX + raio > paddleX.value - paddleConfig.LARGURA / 2 &&
      novoX - raio < paddleX.value + paddleConfig.LARGURA / 2;

    if (
      vy > 0 &&
      novoY + raio >= paddleY &&
      novoY - raio <= paddleY &&
      dentroPaddleX
    ) {
      novoY = paddleY - raio;
      vy = -Math.abs(vy);
    }

    if (novoY - raio > areaAltura.value) {
      vx = 0;
      vy = 0;
      runOnJS(finalizaJogo)();
    }

    bolaX.value = novoX;
    bolaY.value = novoY;
    velocidadeX.value = vx;
    velocidadeY.value = vy;
  });

  const estiloAnimado = useAnimatedStyle(() => ({
    left: bolaX.value - bolaConfig.RAIO,
    top: bolaY.value - bolaConfig.RAIO,
  }));

  return (
    <Animated.View
      style={[
        styles.bola,
        estiloAnimado,
        {
          backgroundColor: Colors.text,
          width: bolaConfig.RAIO * 2,
          height: bolaConfig.RAIO * 2,
          borderRadius: bolaConfig.RAIO,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  bola: {
    position: "absolute",
    backgroundColor: "black",
  },
});
