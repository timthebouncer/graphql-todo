import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { TodoForm } from './TodoForm';
import { TodoItem } from './TodoItem';

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      completed
    }
  }
`;

export default function TodoList() {
  const { loading, error, data, refetch } = useQuery(GET_TODOS);

  if (loading) return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  );
  
  if (error) return (
    <div className="text-red-600 text-center">
      Error: {error.message}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <TodoForm refetch={refetch} />
      <div className="space-y-3">
        {data.todos.map((todo: any) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
            refetch={refetch}
          />
        ))}
      </div>
    </div>
  );
}