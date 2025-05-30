import { View, Text, StyleSheet } from "react-native";
export default function Title({ title }) {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    borderWidth: 2,
    borderColor: "white",
    padding: 12,
    margin: 24,
    borderRadius: 8,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "open-sans-bold",
  },
});
