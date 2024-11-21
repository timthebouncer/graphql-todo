let todos = [
  { id: '1', text: 'Learn GraphQL', completed: false },
  { id: '2', text: 'Build something awesome', completed: true },
];

export const resolvers = {
  Query: {
    todos: () => todos,
  },
  Mutation: {
    addTodo: (_, { text }) => {
      const todo = {
        id: String(todos.length + 1),
        text,
        completed: false,
      };
      todos.push(todo);
      return todo;
    },
    toggleTodo: (_, { id }) => {
      const todo = todos.find(t => t.id === id);
      if (!todo) throw new Error('Todo not found');
      todo.completed = !todo.completed;
      return todo;
    },
    deleteTodo: (_, { id }) => {
      todos = todos.filter(t => t.id !== id);
      return id;
    },
  },
};