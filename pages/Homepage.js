import React, { useState } from "react";
import { StyleSheet, View, TextInput, FlatList } from "react-native";
import {
  Checkbox,
  FAB,
  Text,
  Portal,
  Dialog,
  Provider,
  PaperProvider,
  Button,
} from "react-native-paper";
import { Calendar } from "react-native-calendars";

let id = 1;

export default function Homepage({ todos, setTodos }) {
  const [input, setInput] = useState("");
  const [showEdit, setShowEdit] = useState(true);
  const [editInput, setEditInput] = useState({});
  const [dateVisible, setDateVisible] = React.useState(false);
  const [addTaskVisible, setAddTaskVisible] = React.useState(false);

  const showDialog = (type) => {
    if (type === "addTask") {
      setAddTaskVisible(!addTaskVisible);
    } else if (type === "calendar") {
      setDateVisible(!dateVisible);
    }
  };

  const handleSubmit = () => {
    setTodos([...todos, { id: id++, value: input, complete: false }]);
    setInput("");
    setAddTaskVisible(!addTaskVisible);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((task) => task.id !== id));
  };

  const handleShowEdit = (id) => {
    const selectedTodo = todos.find((todo) => todo.id === id);
    setShowEdit(false);
    setEditInput(selectedTodo);
  };

  const handleEdit = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editInput.id ? editInput : todo
    );
    setTodos(updatedTodos);
    setShowEdit(true);
    setEditInput({});
  };

  const handleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, complete: !todo.complete } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.heading}>
        Hey There!
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: "16px",
          marginVertical: "10px",
        }}
      >
        <Text>Task Lists For:</Text>
        <Button
          onPress={() => showDialog("calendar")}
          style={{ flex: 0 }}
          mode="contained"
          compact
        >
          {new Date().toDateString()}
        </Button>
        <Portal>
          <Dialog
            visible={dateVisible}
            onDismiss={() => showDialog("calendar")}
          >
            <Dialog.Title>Calender</Dialog.Title>
            <Dialog.Content>
              <Calendar></Calendar>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => showDialog("calendar")}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
      {!showEdit && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Edit task"
            value={editInput.value}
            onChangeText={(text) => setEditInput({ ...editInput, value: text })}
          />
          <View style={styles.buttonContainer}>
            <Button title="Edit" onPress={handleEdit} />
          </View>
        </View>
      )}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Checkbox
              style={styles.checkbox}
              status={item.complete ? 'checked' : 'unchecked'}
              onPress={(value) => handleComplete(item.id)}
            />
            <Text style={item.complete ? styles.completedText : {}}>
              {item.value}
            </Text>
            <View style={styles.buttonContainer}>
              <Button title="Edit" onPress={() => handleShowEdit(item.id)} />
              <Button title="Delete" onPress={() => handleDelete(item.id)} />
            </View>
          </View>
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => showDialog("addTask")}
      />
      <Dialog visible={addTaskVisible} onDismiss={() => showDialog("addTask")}>
        <Dialog.Title>Add Task</Dialog.Title>
        <Dialog.Content>
          <TextInput
            style={styles.input}
            placeholder="Add your task"
            value={input}
            onChangeText={(text) => setInput(text)}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleSubmit} type="submit" >Add Task</Button>
        </Dialog.Actions>
        <View></View>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 8,
    padding: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkbox: {
    marginRight: 8,
    width: 20,
    height: 20,
  },
  completedText: {
    textDecorationLine: "line-through",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});