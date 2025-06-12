import {
  StyleSheet,
  TextInput,
  View,
  Text,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Colors } from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import { useState } from "react";

export default function StartGameScreen({ onConfirmUserNumber }) {
  const [enteredNumber, setEnteredNumber] = useState("");
  const { height: deviceHeight } = useWindowDimensions();

  const marginTop = deviceHeight < 400 ? 30 : 100;
  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTop }]}>
          <Title title="Guess My Number" />
          <Card style={styles.mainContainer}>
            <Text style={styles.instructionText}>Enter a number</Text>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              value={enteredNumber}
              onChange={(event) => {
                setEnteredNumber(event.nativeEvent.text);
              }}
            />
            <View style={styles.buttonsContainer}>
              <PrimaryButton
                text="Reset"
                onPress={() => setEnteredNumber("")}
              />
              <PrimaryButton
                text="Confirm"
                onPress={() => onConfirmUserNumber(enteredNumber)}
              />
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    alignItems: "center",
  },
  instructionText: {
    color: Colors.accent500,
    fontSize: 24,
  },
  numberInput: {
    height: 50,
    width: 70,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "open-sans",
    paddingTop: 4,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
