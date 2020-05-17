import React, {useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import TodoItem from './components/TodoItem'

import firebaseApp from './functions/firebaseConfig'

interface Todo {
  id: string
  content: string
  done: boolean
}

export default function App() {
  const [result, setResult] = React.useState<Todo[]>([]);

  useEffect(() => {
    const db = firebaseApp.firestore();
    const fetch = async () => {
      const items: Todo[] = []

      const snapshot = await db
        .collection("tweets")
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

      setResult(items)
    }

    fetch()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={result}
        renderItem={({item}) => <TodoItem text={item.content + ": " + item.done}/>}
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
