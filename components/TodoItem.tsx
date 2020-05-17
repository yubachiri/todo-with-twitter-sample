import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  text: string
}

const TodoItem: React.FC<Props> = ({ text }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
  }
});

export default TodoItem
