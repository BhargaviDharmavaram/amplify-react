
// Amplify.configure(config): Configures Amplify with the settings from amplifyconfiguration.json, which includes AWS credentials and other configuration details.
// generateClient(): Creates a GraphQL client instance using Amplify's API module. This client is used to send GraphQL queries and mutations.
// The client.graphql function from AWS Amplify's API module is used to send GraphQL operations (queries and mutations) to your GraphQL API endpoint. 
// client.graphql Function
// Parameters:
// query (required):

// Type: string
// Description: The GraphQL operation to execute. This can be either a query or a mutation defined as a GraphQL string.
// variables (optional):

// Type: object
// Description: An object containing the variables needed for the GraphQL operation. This is used to pass dynamic values (like input data) into your GraphQL operations.
// authMode (optional):

// Type: string
// Description: Specifies the authentication mode for the GraphQL operation. This is useful when you have different authorization requirements for different operations.
// additionalHeaders (optional):

// Type: object
// Description: Additional HTTP headers to include in the request. This can be used to pass custom headers required by your API.
// region (optional):

// Type: string
// Description: The AWS region to use for the API request. This is important when your API is deployed in a specific AWS region and you need to specify it explicitly.
//Example Usage:
// const todoDetails = {
//   input: {
//     name: 'Sample Todo',
//     description: 'This is a sample todo item.'
//   }
// };

// const { data } = await client.graphql({
//   query: createTodo,
//   variables: todoDetails,
//   authMode: 'AMAZON_COGNITO_USER_POOLS' // Example of authentication mode
// });
import React, { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listTodos } from './graphql/queries';
import { createTodo, deleteTodo, updateTodo } from './graphql/mutations'; 


const client = generateClient();

function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodoName, setNewTodoName] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const { data } = await client.graphql({ query: listTodos });
      console.log('Todos:', data.listTodos.items);
      const todos = data.listTodos.items;
      setTodos(todos);
    } catch (error) {
      console.error('Error fetching todos', error);
    }
  };

  const createNewTodo = async () => {
    try {
      const todoDetails = {
        input: {
          name: newTodoName,
          description: newTodoDescription
        }
      };

      const { data } = await client.graphql({
        query: createTodo,
        variables: todoDetails,
      });

      console.log('Created Todo:', data.createTodo);
      setNewTodoName('');
      setNewTodoDescription('');

      // After creating, fetch updated list of todos
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo', error);
    }
  };

  const handleUpdateTodo = async (id) =>{
    const updatedTodoName = prompt('Enter updated todoname')
    try{
      const updateTodoDetails = {
        input:{
          id :id,
          name : updatedTodoName,
        }
      }
      const {data}= await client.graphql({
        query: updateTodo,
        variables: updateTodoDetails
      })
      console.log('updated Todo:', data.updateTodo);
      fetchTodos()
    }catch(error){
      console.error('Error updating todo', error);
    }
  }

  const handleDeleteTodo = async (id) =>{
    try{
      const deleteTodoId = {
        input:{
          id :id,
        }
      }
      const {data}= await client.graphql({
        query: deleteTodo,
        variables: deleteTodoId
      })
      console.log('deleted Todo:', data.deleteTodo);
      fetchTodos()
    }catch(error){
      console.error('Error deleting todo', error);
    }
  }



  return (
    <div className="App">
      <h1>React App with AWS Amplify</h1>
      <div>
        <div>
          <input
            type="text"
            placeholder="Todo Name"
            value={newTodoName}
            onChange={(e) => setNewTodoName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Todo Description"
            value={newTodoDescription}
            onChange={(e) => setNewTodoDescription(e.target.value)}
          />
          <button onClick={createNewTodo}>Add Todo</button>
        </div>
        {todos.map((todo, index) => (
          <div key={index}>
            <h2>{todo.name}</h2>
            <p>{todo.description}</p>
            <button onClick={()=>{handleUpdateTodo(todo.id)}}>Update</button>
            <button onClick={()=>{handleDeleteTodo(todo.id)}}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todo;