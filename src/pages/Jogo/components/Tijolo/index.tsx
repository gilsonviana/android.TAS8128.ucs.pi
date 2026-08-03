import { Animated } from "react-native";

const ALTURA_TIJOLO = 32;

export const Tijolo: React.FC = () => {
  return (
    <Animated.View
      style={{
        height: ALTURA_TIJOLO,
        flex: 1,
        borderWidth: 1,
        borderColor: "blue",
      }}
    />
  );
};
