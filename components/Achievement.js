import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Card } from "react-native-paper";

const Achievement = ({ title, description, icon }) => {
  return (
    <View style={styles.achievementContainer}>
      <Card style={styles.achievementCard}>
        <View style={styles.contentContainer}>
          <Avatar.Icon
            icon={icon}
            size={48}
            style={styles.icon}
            color="#FF7800"
          />
          <Text style={styles.title}>{title}</Text>
          <Text>{description}</Text>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  achievementContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    marginTop: 12,
  },
  achievementCard: {
    width: "100%",
    height: 130,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    padding: 8,
  },
  contentContainer: {
    alignItems: "center",
  },
  icon: {
    backgroundColor: "#FFF",
    borderRadius: 50,
  },
  title: {
    color: "#FF7800",
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
  },
});

export default Achievement;
