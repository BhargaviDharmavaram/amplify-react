import React from "react";
import Todo from "./Todo";
import { Amplify } from 'aws-amplify';

import {
  withAuthenticator,
  Button,
  View,
  Card,
} from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import config from './amplifyconfiguration.json';
Amplify.configure(config);


function App({ signOut }) {
  return (
    <View className="App">
      <Card>
        <Todo />
      </Card>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
}

export default withAuthenticator(App);