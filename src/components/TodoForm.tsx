import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
      text
      completed
    }
  }
`;

interface TodoFormProps {
  refetch: () => void;
}

export function TodoForm({ refetch }: TodoFormProps) {
  const [newTodo, setNewTodo] = useState('');
  const [addTodo] = useMutation(ADD_TODO);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    await addTodo({ variables: { text: newTodo.trim() } });
    setNewTodo('');
    refetch();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
            +
        </button>
      </div>
    </form>
  );
}