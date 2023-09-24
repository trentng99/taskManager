import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import {
  BottomNavigation,
  PaperProvider,
  useTheme,
  DefaultTheme,
} from "react-native-paper";
import Homepage from "./pages/Homepage";
import Calendar from "./pages/Calendar";
import Achievements from "./pages/Achievements";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      primary: "#FF7800",
      onPrimary: "rgb(255, 255, 255)",
      primaryContainer: "rgb(255, 220, 198)",
      onPrimaryContainer: "rgb(49, 19, 0)",
      secondary: "rgb(135, 82, 0)",
      onSecondary: "rgb(255, 255, 255)",
      secondaryContainer: "rgb(255, 221, 186)",
      onSecondaryContainer: "rgb(43, 23, 0)",
      tertiary: "rgb(121, 89, 0)",
      onTertiary: "rgb(255, 255, 255)",
      tertiaryContainer: "rgb(255, 223, 160)",
      onTertiaryContainer: "rgb(38, 26, 0)",
      error: "rgb(186, 26, 26)",
      onError: "rgb(255, 255, 255)",
      errorContainer: "rgb(255, 218, 214)",
      onErrorContainer: "rgb(65, 0, 2)",
      background: "#fafafa",
      onBackground: "rgb(32, 26, 23)",
      surface: "rgb(255, 251, 255)",
      onSurface: "rgb(32, 26, 23)",
      surfaceVariant: "rgb(244, 222, 211)",
      onSurfaceVariant: "rgb(82, 68, 60)",
      outline: "rgb(132, 116, 106)",
      outlineVariant: "rgb(215, 195, 183)",
      shadow: "rgb(0, 0, 0)",
      scrim: "rgb(0, 0, 0)",
      inverseSurface: "rgb(54, 47, 43)",
      inverseOnSurface: "rgb(251, 238, 232)",
      inversePrimary: "rgb(255, 183, 134)",
      elevation: {
        level0: "transparent",
        level1: "rgb(250, 242, 242)",
        level2: "rgb(247, 237, 235)",
        level3: "rgb(244, 231, 227)",
        level4: "rgb(242, 230, 224)",
        level5: "rgb(240, 226, 219)",
      },
      surfaceDisabled: "rgba(32, 26, 23, 0.12)",
      onSurfaceDisabled: "rgba(32, 26, 23, 0.38)",
      backdrop: "rgba(58, 46, 38, 0.4)",
    },
  };

  const [todos, setTodos] = useState([]);
  const [index, setIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    const loadTasksFromStorage = async () => {
      try {
        const jsonTasks = await AsyncStorage.getItem("tasks");
        setTodos(
          jsonTasks.length > 0 && Array.isArray(jsonTasks) // Check if returned value is an array and not empty
            ? JSON.parse(jsonTasks) // If true, populate todos with jsonTasks
            : [
                // else populate with test data
                {
                  id: 0,
                  value: "test 1",
                  complete: false,
                  description: "some description",
                  startDate: new Date().toISOString().split("T")[0],
                  endDate: new Date().toISOString().split("T")[0],
                },
              ]
        );
      } catch (error) {
        console.error("Error loading tasks from AsyncStorage: ", error);
      }
    };

    loadTasksFromStorage();
  }, []);

  const saveTasksToStorage = async (tasks) => {
    try {
      const jsonTasks = JSON.stringify(tasks);
      await AsyncStorage.setItem("tasks", jsonTasks);
    } catch (error) {
      console.error("Error saving tasks to AsyncStorage: ", error);
    }
  };

  useEffect(() => {
    saveTasksToStorage(todos);
  }, [todos]);

  const [routes] = useState([
    {
      key: "home",
      title: "",
      focusedIcon: "home-variant",
      unfocusedIcon: "home-variant-outline",
    },
    {
      key: "achievements",
      title: "",
      focusedIcon: "medal",
      unfocusedIcon: "medal-outline",
    },
    {
      key: "calendar",
      title: "",
      focusedIcon: "application",
      unfocusedIcon: "application-outline",
    },
  ]);

  const HomeRoute = () => (
    <Homepage
      todos={todos}
      setTodos={setTodos}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      saveTasksToStorage={saveTasksToStorage}
    ></Homepage>
  );
  const CalendarRoute = () => (
    <Calendar todos={todos} setTodos={setTodos}></Calendar>
  );
  const AchievementsRoute = () => (
    <Achievements todos={todos} setTodos={setTodos}></Achievements>
  );

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    achievements: AchievementsRoute,
    calendar: CalendarRoute,
  });

  return (
    <PaperProvider theme={theme}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
