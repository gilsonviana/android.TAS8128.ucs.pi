import { PADDLE_FACIL } from "@/constants/grade";
import { Animated, StyleSheet } from "react-native";

export const Paddle: React.FC = () => {
  return <Animated.View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    borderWidth: 1,
    width: PADDLE_FACIL.LARGURA,
    height: 16,
    borderRadius: 16,
  },
});
