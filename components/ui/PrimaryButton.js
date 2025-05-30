import { Pressable, View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
export default function PrimaryButton({ text, onPress }) {
  return (
    <View style={styles.btnOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.pressed, styles.btnInnerContainer]
            : styles.btnInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: Colors.primary600 }}
      >
        <Text style={styles.btnText}>{text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  btnOuterContainer: {
    margin: 4,
    borderRadius: 28,
    overflow: "hidden",
    flex: 1,
  },
  btnInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  btnText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
