import * as types from '../constants/ActionTypes';

export function addTodo(text){
  return (dispatch) => {
    var request = new XMLHttpRequest();
    request.open("POST", '/api/create', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        var response = JSON.parse(request.responseText);;
        if (response.error) {
          dispatch(addedTodo(null));
        } else {
          var result = response.result;
          if (result) {
            dispatch(addedTodo({
              id: result._id,
              text: result.text,
              completed: result.completed,
              dateCreated: result.dateCreated
            }));
          } else {
            dispatch(addedTodo(null));
          }
        }
      } else {
        dispatch(addedTodo(null));
      }
    }

    request.onerror = (err) => {
      console.log(err);
      dispatch(addedTodo(null));
    }
    request.send(`text=${text}`);
  }
}

export function addedTodo(todo){
  return {
    type: types.ADD_TODO,
    todo
  }
}

export function deleteTodo(id){
  return {
    type: types.DELETE_TODO,
    id
  }
}

export function editTodo(id, text){
  return {
    type: types.EDIT_TODO,
    id,
    text
  }
}

export function completeTodo(id){
  return {
    type: types.COMPLETE_TODO,
    id
  }
}

export function completeAll(){
  return {
    type: types.COMPLETE_ALL
  }
}

export function clearCompleted(){
  return {
    type: types.CLEAR_COMPLETED
  }
}

export function allTodos(todos){
  return {
    type: types.ALL_TODOS,
    todos
  }
}

export function loadTodos(){
  return (dispatch) => {
    fetch('/api/todos').then(
      response => response.json().then(todos => ({todos, response}))
    ).then(({todos, response}) => {
      if (response.ok) {
        dispatch(allTodos(todos.todos));
      } else {
        dispatch(allTodos([]));
      }
    });
  }
}