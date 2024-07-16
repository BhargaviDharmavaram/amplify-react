import React from "react";
import Todo from "./Todo";
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { Authenticator } from '@aws-amplify/ui-react';

import {
  withAuthenticator,
  Button,
  View,
  Card,
} from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import config from './amplifyconfiguration.json';
Amplify.configure(config);

const client = generateClient();

// async function fetchTodos() {
//   try {
//     const {data} = await client.graphql({query: listTodos}, { authMode: 'AMAZON_COGNITO_USER_POOLS' });
//     console.log('Todos:', data.listTodos.items);
//     return data.listTodos.items;
//   } catch (err) {
//     console.log('Error fetching todos', err);
//   }
// }
// function App({ signOut }) {
//   //fetchTodos();
//   return (
//     <View className="App">
//       <Card>
//         <Todo />
//       </Card>
//       <Button onClick={signOut}>Sign Out</Button>
//     </View>
//   );
// }

// export default withAuthenticator(App);

export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user?.username}</h1>
          <Todo/>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
};