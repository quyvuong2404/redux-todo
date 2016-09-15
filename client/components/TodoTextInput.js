import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class TodoTextInput extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    const text = this.refs.newText.value.trim();
    if (text) {
      if (e.which === 13) {
        this.props.onSave(text);
        this.refs.newText.value = "";
      }
    }
  }

  render(){
    return(
      <input className={classnames({
          edit: this.props.editing,
          "new-todo": this.props.newTodo
        })}
        type="text"
        placeholder={this.props.placeholder}
        autoFocus="true"
        onKeyDown={this.handleSubmit}
        ref="newText" />
    );
  }
}

TodoTextInput.propTypes = {
  onSave: PropTypes.func.isRequired,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  editing: PropTypes.string,
  newTodo: PropTypes.bool
}

export default TodoTextInput;
