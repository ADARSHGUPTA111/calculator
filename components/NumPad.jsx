import React, { useState } from "react";

import { View, StyleSheet, Text, Alert, Button } from "react-native";

const NumPad = props => {
  const [enteredValue, setEnteredValue] = useState("");
  const [toBeCalculatedValue, setToBeCalculatedValue] = useState("");
  const [answer, setAnswer] = useState("");
  const [scientificMode, setScientificMode] = useState(false);

  const inputHandler = number => {
    let newInput = enteredValue + number;
    let replace = newInput
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/%/g, "/100")
      .replace(/e/g, "Math.E")
      .replace(/π/g, "Math.PI")
      .replace(/abs\(/g, "Math.abs(")
      .replace(/sin\(/g, "Math.sin(")
      .replace(/cos\(/g, "Math.cos(")
      .replace(/tan\(/g, "Math.tan(")
      .replace(/log\(/g, "Math.log10(")
      .replace(/ln\(/g, "Math.log(");

    // console.log(newInput, "newly created!");
    // console.log(enteredValue, "EnteredValue");
    // console.log(replace, "ReplacedValue");

    setToBeCalculatedValue(replace);

    setEnteredValue(newInput);
    // setEnteredValue(replace);
  };

  const evaluate = () => {
    console.log(toBeCalculatedValue, "To be evaluated!");
    try {
      let result = eval(toBeCalculatedValue);
      if (result === Infinity) {
        Alert.alert("Cannot be divided by 0");
      } else {
        setAnswer(result);
      }
    } catch (e) {
      Alert.alert("Invalid Input");
    }
  };

  const reset = () => {
    setEnteredValue("");
    setToBeCalculatedValue("");
    setAnswer("");
  };

  const removeCharacter = () => {
    let text = enteredValue.split("");
    text.pop();
    setEnteredValue(text.join(""));
  };

  const scientificModeOn = () => {
    setScientificMode(true);
  };

  const scientificModeOff = () => {
    setScientificMode(false);
  };

  const sqrtHandler = sign => {
    let newInput = `${toBeCalculatedValue}${sign}`;
    let replace = newInput.replace(/√/g, "Math.sqrt(");
    console.log(newInput, "newInput");
    console.log(replace, "replaced");

    setEnteredValue(replace);
    setToBeCalculatedValue(replace);
  };

  const factorialHandler = sign => {
    // let newInput = `${toBeCalculatedValue}${sign}`;
    let x = toBeCalculatedValue.slice(0, toBeCalculatedValue.indexOf("+")); //all the start part till +
    let y = toBeCalculatedValue.slice(toBeCalculatedValue.indexOf("+")); //till the end

    let z = parseInt(y);

    console.log(z, "Factorial of!");
    console.log(toBeCalculatedValue, "To be evaluated,before!");
    if (z === 0) return 1;
    let f = 1;
    for (let i = 1; i < z; i++) {
      f = f * (i + 1);
    }

    // let replace = newInput.replace(/!/g, f);
    evaluate();
    console.log(toBeCalculatedValue.replace("y", f), "y");

    setEnteredValue(toBeCalculatedValue.replace("y", f));
    setToBeCalculatedValue(f);
    console.log(toBeCalculatedValue, "To be evaluated,after!");
    console.log(f, "Evaluated,after!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenWrapper}>
        <View>
          <Text style={styles.title}>Calculator</Text>
        </View>
        <View style={styles.emptyArea}></View>

        <View style={styles.display}>
          <Text
            style={styles.enteredValueDisplay}
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {enteredValue}
          </Text>
        </View>
        <View style={styles.answerDisplay}>
          <Text style={styles.answerTextDisplay}>{answer}</Text>
        </View>
      </View>

      <View style={styles.numPadWrapper}>
        <View
          style={[
            styles.btnScnRowWrapper,
            scientificMode ? "" : styles.displayNormal
          ]}
        >
          <Text style={styles.btnScn} onPress={() => inputHandler("sin(")}>
            sin
          </Text>
          <Text style={styles.btnScn} onPress={() => inputHandler("cos(")}>
            cos
          </Text>
          <Text style={styles.btnScn} onPress={() => inputHandler("tan(")}>
            tan
          </Text>
          <Text style={styles.btnScn} onPress={() => inputHandler("log(")}>
            log
          </Text>
        </View>
        <View
          style={[
            styles.btnScnRowWrapper,
            scientificMode ? "" : styles.displayNormal
          ]}
        >
          <Text style={styles.btnScn} onPress={() => inputHandler("ln(")}>
            ln
          </Text>
          <Text style={styles.btnScn} onPress={() => inputHandler("abs(")}>
            abs
          </Text>
          <Text style={styles.btnScn} onPress={() => inputHandler("(")}>
            (
          </Text>
          <Text style={styles.btnScn} onPress={() => inputHandler(")")}>
            )
          </Text>
        </View>
        <View
          style={[
            styles.btnScnRowWrapper,
            scientificMode ? "" : styles.displayNormal
          ]}
        >
          <Text style={styles.btnScn} onPress={() => sqrtHandler("√")}>
            √
          </Text>
          <Text style={styles.btnScn} onPress={() => factorialHandler("!")}>
            !
          </Text>
          <Text style={styles.btnScn} onPress={() => inputHandler("π")}>
            π
          </Text>
          <Text style={styles.btnScn} onPress={() => inputHandler("e")}>
            e
          </Text>
        </View>

        <View
          style={[
            styles.btnRowWrapper,
            scientificMode ? styles.heightScientific : styles.heightNormal
          ]}
        >
          <Text style={styles.btn} onPress={reset}>
            C
          </Text>
          <Text style={styles.btn} onPress={() => inputHandler("%")}>
            %
          </Text>
          <Text style={styles.btn} onPress={removeCharacter}>
            {"DEL"}
          </Text>
          <Text style={styles.btn} onPress={() => inputHandler("÷")}>
            ÷
          </Text>
        </View>
        <View
          style={[
            styles.btnRowWrapper,
            scientificMode ? styles.heightScientific : styles.heightNormal
          ]}
        >
          <Text style={styles.btnNum} onPress={() => inputHandler(7)}>
            7
          </Text>
          <Text style={styles.btnNum} onPress={() => inputHandler(8)}>
            8
          </Text>
          <Text style={styles.btnNum} onPress={() => inputHandler(9)}>
            9
          </Text>
          <Text style={styles.btn} onPress={() => inputHandler("×")}>
            ×
          </Text>
        </View>
        <View
          style={[
            styles.btnRowWrapper,
            scientificMode ? styles.heightScientific : styles.heightNormal
          ]}
        >
          <Text style={styles.btnNum} onPress={() => inputHandler(4)}>
            4
          </Text>
          <Text style={styles.btnNum} onPress={() => inputHandler(5)}>
            5
          </Text>
          <Text style={styles.btnNum} onPress={() => inputHandler(6)}>
            6
          </Text>
          <Text style={styles.btn} onPress={() => inputHandler("-")}>
            -
          </Text>
        </View>
        <View
          style={[
            styles.btnRowWrapper,
            scientificMode ? styles.heightScientific : styles.heightNormal
          ]}
        >
          <Text style={styles.btnNum} onPress={() => inputHandler(1)}>
            1
          </Text>
          <Text style={styles.btnNum} onPress={() => inputHandler(2)}>
            2
          </Text>
          <Text style={styles.btnNum} onPress={() => inputHandler(3)}>
            3
          </Text>
          <Text style={styles.btn} onPress={() => inputHandler("+")}>
            +
          </Text>
        </View>
        <View
          style={[
            styles.btnRowWrapper,
            scientificMode ? styles.heightScientific : styles.heightNormal
          ]}
        >
          <Text style={styles.btnNum} onPress={() => inputHandler("00")}>
            00
          </Text>
          <Text style={styles.btnNum} onPress={() => inputHandler(0)}>
            0
          </Text>
          <Text style={styles.btnNum} onPress={() => inputHandler(".")}>
            .
          </Text>
          <Text style={styles.btn} onPress={evaluate}>
            =
          </Text>
        </View>
      </View>
      {!scientificMode && (
        <Button title="Scientific" onPress={() => scientificModeOn()} />
      )}
      {scientificMode && (
        <Button title="Normal" onPress={() => scientificModeOff()} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 35,
    backgroundColor: "#121212"
  },
  screenWrapper: {
    flex: 1,
    height: "40%"
  },
  emptyArea: {
    height: "30%" //relative to parent
  },

  numPadWrapper: {
    backgroundColor: "#222222",
    height: "60%"
  },
  enteredValueDisplay: {
    color: "white",
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 40
  },
  answerTextDisplay: {
    textAlign: "right",
    fontSize: 32,
    color: "grey"
  },
  angleModeDisplay: {
    textAlign: "left",
    fontSize: 32,
    color: "grey"
  },
  display: {
    display: "flex",
    width: "100%",
    height: "40%"
  },
  answerDisplay: {
    marginBottom: 10
  },
  title: {
    color: "cyan",
    textAlign: "center",
    fontSize: 20
  },
  btnRowWrapper: {
    display: "flex",
    flexDirection: "row"
    // height: "20%" -->Normal
    // height: "13%" -->Scientific
  },
  btnScnRowWrapper: {
    display: "flex",
    flexDirection: "row",
    height: "13%",
    backgroundColor: "#383838"
  },
  displayNormal: {
    display: "none"
  },
  heightNormal: {
    height: "20%"
  },
  heightScientific: {
    height: "13%"
  },
  btn: {
    textAlign: "center",
    color: "cyan",
    width: "25%",
    fontSize: 30
  },
  btnNum: {
    textAlign: "center",
    color: "white",
    width: "25%",
    fontSize: 30
  },
  btnScn: {
    textAlign: "center",
    color: "white",
    width: "25%",
    fontSize: 25
  }
});

export default NumPad;
