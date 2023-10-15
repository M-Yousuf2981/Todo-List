import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  FlatList,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";
import GoalInput from "./components/goalInput";
import GoalItem from "./components/goalItem";

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [courseGoals, setCourseGoal] = useState([]);

  function addGoalHandler(enteredGoalText) {
    setCourseGoal((prevState) => [
      ...prevState,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    console.log(courseGoals);
    setIsVisible(false);
  }

  function deleteHandlerItem(id) {
    console.log("delete");
    setCourseGoal((prevState) => prevState.filter((item) => item.id !== id));
  }

  function modalVisibleHandler() {
    setIsVisible(true);
  }

  function modalCancelHandler() {
    setIsVisible(false);
    console.log("cancel");
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.img}
        source={require("./assets/img/bg.jpg")}
      >
        <StatusBar style="light" />
        <View style={styles.childContainer}>
          <Button title="Add New Goal" color="#333" onPress={modalVisibleHandler} />
          <GoalInput
            visible={isVisible}
            onCancel={modalCancelHandler}
            addGoalHandler={addGoalHandler}
          />
          <View style={styles.goalContainer}>
            <FlatList
              data={courseGoals}
              renderItem={(data) => {
                return (
                  <GoalItem
                    text={data.item.text}
                    id={data.item.id}
                    onDeleteItem={deleteHandlerItem}
                  />
                );
              }}
              keyExtractor={(item, index) => {
                return item.id;
              }}
              alwaysBounceVertical={false}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  childContainer: {
    paddingTop: 50,
    paddingHorizontal: 20,
    flex: 1
  },
  goalContainer: {
    flex: 5,
    marginTop: 20,
  },
});
