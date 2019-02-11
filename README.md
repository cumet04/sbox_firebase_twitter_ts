# firebase twitter sample

```
yarn global add firebase-tools
yarn global add @google-cloud/functions-emulator --ignore-engines
firebase init
cd functions; yarn; yarn run build; cd ..
firebase deploy
firebase serve
```

### memo

- firebase-tools や functions-emulator を local インストールで使おうとすると deploy でしぬ
