import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { Colors } from "../../constants/colors";
export default function NumberContainer({ children }) {
  const { width: deviceWidth } = useWindowDimensions();
  const dynamicStyles = {
    padding: deviceWidth < 380 ? 12 : 24,
    margin: deviceWidth < 380 ? 12 : 24,
  };
  return (
    <View style={[styles.container, dynamicStyles]}>
      <Text style={styles.number}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    color: Colors.accent500,
    fontSize: 36,
    fontWeight: "bold",
    fontFamily: "open-sans",
  },
});
