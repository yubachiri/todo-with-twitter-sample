import React, {useEffect} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import TodoItem from './components/TodoItem'

import firebaseApp from './functions/firebaseConfig'

export interface Todo {
  id: string
  content: string
  done: boolean
}

export default function App() {
  const [todo, setTodo] = React.useState<Todo[]>([]);
  const db = firebaseApp.firestore();

  const fetchTodo = async () => {
    const items: Todo[] = []

    const snapshot = await db.collection("tweets")
      .where("done", "==", false)
      .get()

    snapshot.forEach((doc) => {
      const {content, done} = doc.data()
      const todo = {
        id: doc.id,
        content: content || "contentが取得できませんでした",
        done: done || false
      }
      items.push(todo)
    })

    setTodo(items)
  }

  const handleDone = (todo: Todo, status: boolean) => {
    db
      .collection("tweets")
      .doc(todo.id)
      .set({
        content: todo.content,
        done: status
      })
  }

  useEffect(() => {
    fetchTodo()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Button title={"refetch"} onPress={fetchTodo}/>
      <FlatList
        data={todo}
        renderItem={({item}) => {
          return (
            <TodoItem
              todo={item}
              text={item.content}
              completeTodo={(todo) => {
                handleDone(todo, true)
                fetchTodo()
              }}
            />
          )
        }}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
