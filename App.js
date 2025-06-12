import { Alert, ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import GameScreen from "./screens/GameScreen";
import { Colors } from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar, statusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!loaded) {
    SplashScreen.hideAsync();
  }

  const [userNumber, setUserNumber] = useState();
  const [isGameOver, setIsGameOver] = useState(false);
  const [guessRounds, setGuessRounds] = useState(0);

  function clearUserNumber() {
    setUserNumber(undefined);
  }
  function confirmUserNumber(enteredNumber) {
    const chosenNumber = parseInt(enteredNumber, 10);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid Number",
        "Please enter a valid number between 1 and 99.",
        [{ text: "Okay", style: "destructive", onPress: clearUserNumber }]
      );
      setUserNumber(undefined);
      return;
    }
    setUserNumber(chosenNumber);
  }

  function handleGameOver() {
    setUserNumber(undefined);
    setGuessRounds(0);
    setIsGameOver(false);
  }

  let screen = (
    <StartGameScreen
      userNumber={userNumber}
      onConfirmUserNumber={confirmUserNumber}
    />
  );

  if (userNumber && !isGameOver) {
    screen = (
      <GameScreen
        userNumber={userNumber}
        onAddGuess={() => setGuessRounds((prev) => prev + 1)}
        onGameOver={() => setIsGameOver(true)}
      />
    );
  }

  if (isGameOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        guessRounds={guessRounds}
        onGameOver={() => handleGameOver()}
      />
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.rootScreen}
      >
        <ImageBackground
          style={styles.rootScreen}
          source={require("./assets/background.png")}
          resizeMode="cover"
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.safeArea}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
