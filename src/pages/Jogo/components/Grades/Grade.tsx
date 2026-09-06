import { GRADE_LAYOUT } from "@/constants/grade";
import { useJogoFisica } from "@/contexts/jogoFisica";
import { construirTijolos } from "@/pages/Jogo/fisica";
import { Tijolo } from "@/pages/Jogo/components/Tijolo";
import { useEffect, useState } from "react";
import { View, type LayoutChangeEvent } from "react-native";

type GradeProps = {
  linhas: readonly number[];
};

export const Grade: React.FC<GradeProps> = ({ linhas }) => {
  const { tijolos } = useJogoFisica();
  const [largura, setLargura] = useState(0);
  let indice = 0;

  const onLayout = (e: LayoutChangeEvent) => {
    setLargura(e.nativeEvent.layout.width);
  };

  // Escrita única: montar o array inteiro de uma vez evita o read-modify-write
  // entre threads (JS escreve em shared value de forma assíncrona), que fazia
  // os registros de cada tijolo se sobrescreverem.
  useEffect(() => {
    if (largura > 0) {
      tijolos.value = construirTijolos(linhas, largura);
    }
  }, [linhas, largura, tijolos]);

  return (
    <View
      onLayout={onLayout}
      style={{
        paddingTop: GRADE_LAYOUT.PADDING_TOP,
        paddingHorizontal: GRADE_LAYOUT.PADDING_HORIZONTAL,
      }}
    >
      {linhas.map((colunas, i) => (
        <View
          key={i}
          style={{
            flexDirection: "row",
            marginBottom: GRADE_LAYOUT.MARGIN_BOTTOM,
          }}
        >
          {Array.from({ length: colunas }).map((_, j) => {
            const tijoloIndice = indice++;
            return <Tijolo key={j} indice={tijoloIndice} />;
          })}
        </View>
      ))}
    </View>
  );
};
