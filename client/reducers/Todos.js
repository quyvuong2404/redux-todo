import { ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED, DOUBLE_CLICK_TODO, ALL_TODOS } from '../constants/ActionTypes';

const initialState = [];

export default function todos(state = initialState, action) {
  switch(action.type){
    case ADD_TODO:
      if (action.todo) {
        let todo = action.todo;
        return [
          {
            id: todo.id,
            text: todo.text,
            completed: todo.completed,
            dateCreated: todo.dateCreated
          },
          ...state
        ];
      } else {
        return state;
      }

    case DELETE_TODO:
      fetch('/api/todo/'+action.id, {
        method: "DELETE"
      });
      return state.filter(todo => todo.id !== action.id);

    case EDIT_TODO:
      fetch('/api/todo/'+action.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `text=${action.text}`
      });
      return state.map(todo => 
        todo.id == action.id ? Object.assign({}, todo, { text: action.text }) : todo
      );

    case COMPLETE_TODO:
      fetch('/api/todo/complete/'+action.id, {
        method: "PUT"
      });
      return state.map(todo =>
        todo.id === action.id ? Object.assign({}, todo, { completed: !todo.completed }) : todo
      );

    case COMPLETE_ALL:
      fetch('/api/todos/complete', {
        method: "PUT"
      });
      const areAllMarked = state.every(todo => todo.completed);
      return state.map(todo => Object.assign({}, todo, { completed: true }));

    case CLEAR_COMPLETED:console.log(CLEAR_COMPLETED);
      fetch('/api/todos/completed/clear', {
        method: "DELETE"
      });
      return state.filter(todo => todo.completed === false);

    case ALL_TODOS:
      return [
        ...action.todos,
        ...state
      ];

    default:console.log('default');
      return state;
  }
}
