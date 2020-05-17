# todo-with-twitter-sample
Firestoreからデータを取得してTODO管理できるアプリ。

Firestoreのデータはこんなイメージ

```
{
  tweets: {
    docId: {
      content: string,
      done: boolean
    }
  }
}
```

# 起動
expoのCLIをインストールしておく。

[公式 Introduce](https://docs.expo.io/)

```
$ yarn install
$ yarn start
```

# 備考
firebaseの認証情報はプロジェクト直下に`firebaseEnv.ts`を設置し、そこに記載する。下記コマンドでfirebaseEnv.ts.exampleをコピーすればOK。

```
$ cp firebaseEnv.ts.example firebaseEnv.ts
```
