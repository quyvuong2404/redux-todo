import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as TodoActions from '../actions/Todos';

class App extends Component {
  constructor(props, context){
    super(props, context);
  }

  render() {
    return(
      <div>
        { /*React.cloneElement(this.props.children, this.props)*/ }
        { this.props.children }
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    todos: state.todos,
    user: state.user
  }
}

// export default connect(mapStateToProps)(App);
export default App;
