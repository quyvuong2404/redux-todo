import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { deleteTodo, editTodo, completeTodo } from '../actions/Todos';

class TodoItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state= { editing: false, textInput: this.props.todo.text };
  }

  handleDoubleClick(){
    this.setState({
      editing: true
    });
  }

  handleSave(id, text){
    if (text.length === 0) {
      this.props.dispatch(deleteTodo(id));
    } else {
      this.props.dispatch(editTodo(id, text));
    }
    this.setState({
      editing: false
    });
  }

  handleDelete(id){
    this.props.dispatch(deleteTodo(id));
  }

  handleComplete(id){
    this.props.dispatch(completeTodo(id));
  }

  handleSubmit(e){
    if (e.which == 13) {
      var id = this.refs.newText.id;
      var text = this.state.textInput.trim();
      this.handleSave(id, text);
    }
  }

  handleChange(e){
    this.setState({
      textInput: e.target.value
    });
  }

  render(){
    const { todo } = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <input className={classnames({
            edit: this.state.editing,
            "new-todo": true
          })}
          id={todo.id}
          type="text"
          autoFocus="true"
          onKeyDown={this.handleSubmit.bind(this)}
          onChange={this.handleChange.bind(this)}
          value={this.state.textInput}
          ref="newText" />
      );
    } else {
      element = (
        <div className="view">
          <input className="toggle" 
                  type="checkbox" 
                  checked={todo.completed} 
                  onChange={this.handleComplete.bind(this, todo.id)} />
          <label onDoubleClick={this.handleDoubleClick.bind(this)}>
            {todo.text}
          </label>
          <button className="destroy" onClick={this.handleDelete.bind(this, todo.id)} />
        </div>
      );
    }

    

    return(
      <li className={classnames({
          completed: todo.completed,
          editing: this.state.editing
        })}>
        {element}
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
}

export default TodoItem;
