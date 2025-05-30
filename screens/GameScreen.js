import { View, Text, StyleSheet, Alert, FlatList } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import { Colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNumber;
  }
}

export default function GameScreen({ userNumber, onGameOver, onAddGuess }) {
  const initialGuess = generateRandomBetween(1, 100, undefined);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver();
    }
  }, [currentGuess, userNumber, onGameOver]);

  const handleAddPastGuesses = (newGuess) => {
    setPastGuesses((prevGuesses) => [newGuess, ...prevGuesses]);
  };

  function nextGuessHandler(direction) {
    onAddGuess();
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "higher" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    let guess;
    if (direction === "lower") {
      guess = generateRandomBetween(1, currentGuess, undefined);
      setCurrentGuess(guess);
      handleAddPastGuesses(guess);
    } else {
      guess = generateRandomBetween(currentGuess + 1, 100, undefined);
      setCurrentGuess(generateRandomBetween(guess));
      handleAddPastGuesses(guess);
    }
  }
  return (
    <View style={styles.mainContainer}>
      <Title title="Opponent's Guess" />
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <Text style={styles.text}>Higher or lower?</Text>
        <View style={styles.buttonsContainer}>
          <PrimaryButton
            text={<Ionicons name="add" size={20} color="white" />}
            onPress={() => nextGuessHandler("higher")}
          />
          <PrimaryButton
            text={<Ionicons name="remove" size={20} color="white" />}
            onPress={() => nextGuessHandler("lower")}
          />
        </View>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          data={pastGuesses}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={pastGuesses.length - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 24,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  text: {
    color: Colors.accent500,
    fontFamily: "open-sans",
  },
});
