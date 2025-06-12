import { View, StyleSheet, useWindowDimensions } from "react-native";
import { Colors } from "../../constants/colors";
export default function Card({ children }) {
  const { width: deviceWidth } = useWindowDimensions();
  const marginTop = deviceWidth < 380 ? 18 : 36;
  return <View style={[styles.card, { marginTop }]}>{children}</View>;
}
const styles = StyleSheet.create({
  card: {
    padding: 16,
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
