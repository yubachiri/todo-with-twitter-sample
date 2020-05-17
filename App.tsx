import React, {useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import TodoItem from './components/TodoItem'

import firebaseApp from './functions/firebaseConfig'

export default function App() {
  const [result, setResult] = React.useState<string[]>([]);

  useEffect(() => {
    const db = firebaseApp.firestore();
    const fetch = async () => {
      const items: string[] = []

      const snapshot = await db.collection("tweets").get()
      snapshot.forEach((doc) => {
        items.push(doc.get("content") || "contentが取得できませんでした")
      })

      setResult(items)
    }

    fetch()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={result}
        renderItem={({item}) => <TodoItem text={item}/>}
        keyExtractor={item => item}
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
