import React from 'react';
import { gql, useMutation } from '@apollo/client';

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: ID!) {
    toggleTodo(id: $id) {
      id
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  refetch: () => void;
}

export function TodoItem({ id, text, completed, refetch }: TodoItemProps) {
  const [toggleTodo] = useMutation(TOGGLE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  const handleToggle = async () => {
    await toggleTodo({ variables: { id } });
    refetch();
  };

  const handleDelete = async () => {
    await deleteTodo({ variables: { id } });
    refetch();
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors duration-200">
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggle}
        >
          {completed ? (
              <>✔</>
          ) : (
              <>⚪</>
          )}
        </button>
        <span className={`${completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
          {text}
        </span>
      </div>
      <button
        onClick={handleDelete}
        className="text-gray-400 opacity-0 group-hover:opacity-100"
      >
        🗑
      </button>
    </div>
  );
}