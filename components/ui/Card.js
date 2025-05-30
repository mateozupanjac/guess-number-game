import { View, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
export default function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginTop: 36,
    marginHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});
