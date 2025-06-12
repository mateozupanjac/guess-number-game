import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from "react-native";
export default function Title({ title }) {
  const { height: deviceHeight } = useWindowDimensions();
  const dynamicStyles = {
    padding: deviceHeight < 400 ? 6 : 12,
    margin: deviceHeight < 400 ? 12 : 24,
  };
  return (
    <View style={[styles.titleContainer, dynamicStyles]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    borderWidth: 0,
    // borderWidth: Platform.select({ ios: 0, android: 2 }),
    borderColor: "white",
    margin: 24,
    borderRadius: 8,
    maxWidth: "80%",
    width: 300,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "open-sans-bold",
  },
});
