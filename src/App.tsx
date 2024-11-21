import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import TodoList from './components/TodoList';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen p-8">
        <div className="max-w-3xl mx-auto">
          <TodoList />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;