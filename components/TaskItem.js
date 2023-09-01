import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Checkbox, Text, Button, Dialog, Portal } from "react-native-paper";
import { formatDate } from "../commons/formatDate";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon library you prefer

const TaskItem = ({ item, handleComplete, handleDelete, showDialog }) => {
  const [visible, setVisible] = useState(false);

  const showTaskDetails = () => {
    setVisible(true);
  };

  const hideTaskDetails = () => {
    setVisible(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.todoItem} onPress={showTaskDetails}>
        <View style={styles.todoItemContent}>
          <Checkbox
            style={styles.circularCheckbox}
            status={item.complete ? "checked" : "unchecked"}
            onPress={() => handleComplete(item.id)}
          />
          <View>
            <Text style={item.complete ? styles.completedText : styles.title}>
              {item.value}
            </Text>
            {!item.complete && (
              <>
                <Text style={styles.dueDate}>
                  Due Date: {formatDate(item.endDate)}
                </Text>
              </>
            )}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          {!item.complete && (
            <>
              <Button
                mode="text"
                onPress={() => showDialog(item)}
                icon="pencil"
              />
              <Button
                mode="text"
                onPress={() => handleDelete(item.id)}
                icon="trash-can-outline"
              />
            </>
          )}
        </View>
      </TouchableOpacity>
      <Portal>
        <Dialog visible={visible} onDismiss={hideTaskDetails}>
          <Dialog.Title style={styles.dialogTitle}>{item.value}</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>
              <Icon name="description" size={16} color="#007AFF" /> Description:{" "}
              {item.description}
            </Text>
            <Text style={styles.dialogText}>
              <Icon name="event" size={16} color="#007AFF" /> Start Date:{" "}
              {formatDate(item.startDate)}
            </Text>
            <Text style={styles.dialogText}>
              <Icon name="event" size={16} color="#007AFF" /> End Date:{" "}
              {formatDate(item.endDate)}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideTaskDetails} style={styles.dialogButton}>
              Close
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 8,
    height: 60,
    elevation: 2,
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  dueDate: {
    fontSize: 10,
    color: "#b1b1b1",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  todoItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dialogTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  dialogText: {
    fontSize: 16,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  dialogButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 8,
  },
  circularCheckbox: {
    marginRight: 4,
  },
});
