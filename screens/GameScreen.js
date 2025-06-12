import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  useWindowDimensions,
} from "react-native";
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

let minBoundary = 1;
let maxBoundary = 100;

export default function GameScreen({ userNumber, onGameOver, onAddGuess }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const { height: deviceHeight, width: deviceWidth } = useWindowDimensions();

  const dynamicStyles = {
    padding: deviceHeight < 400 ? 6 : 24,
  };

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver();
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

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

    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }

    let guess = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
    setCurrentGuess(guess);
    handleAddPastGuesses(guess);
  }

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <Text style={styles.text}>Higher or lower?</Text>
        <View style={[styles.buttonsContainer, dynamicStyles]}>
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
    </>
  );

  if (deviceWidth > deviceHeight) {
    content = (
      <>
        <Text style={styles.text}>Higher or lower?</Text>
        <View style={[styles.buttonsContainer, dynamicStyles]}>
          <PrimaryButton
            text={<Ionicons name="add" size={20} color="white" />}
            onPress={() => nextGuessHandler("higher")}
          />
          <NumberContainer>{currentGuess}</NumberContainer>
          <PrimaryButton
            text={<Ionicons name="remove" size={20} color="white" />}
            onPress={() => nextGuessHandler("lower")}
          />
        </View>
      </>
    );
  }
  return (
    <View style={[styles.mainContainer, dynamicStyles]}>
      <Title title="Opponent's Guess" />
      {content}
      <View style={[styles.listContainer, dynamicStyles]}>
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
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Colors.accent500,
    fontFamily: "open-sans",
  },
});
