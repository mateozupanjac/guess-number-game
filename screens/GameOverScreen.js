import { View, StyleSheet, Text, Image } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Colors } from "../constants/colors";

export default function GameOverScreen({
  userNumber,
  guessRounds,
  onGameOver,
}) {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text}>Game Over!</Text>
      <Text style={styles.text}>Thank you for playing!</Text>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/success.png")} style={styles.image} />
      </View>
      <Text style={styles.summaryText}>
        Your phone needed{" "}
        <Text style={styles.highlightText}>{guessRounds}</Text> rounds to guess
        the number <Text style={styles.highlightText}>{userNumber}</Text>.
      </Text>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          text="New Game"
          onPress={() => {
            onGameOver();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  imageContainer: {
    overflow: "hidden",
    borderRadius: 150,
    width: 300,
    height: 300,
    borderWidth: 3,
    borderColor: Colors.primary800,
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    color: Colors.accent500,
    fontSize: 24,
  },
  summaryText: {
    fontFamily: "open-sans",
    textAlign: "center",
    fontSize: 24,
    marginBottom: 24,
  },
  highlightText: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
