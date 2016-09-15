import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import MainSection from './MainSection';
import Header from './Header';


class Home extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div>
				<Helmet
					title="Homepage - Todo"
				/>
				<Header {...this.props} />
				<MainSection {...this.props} />
			</div>
		);
	}
}


function mapStateToProps(state){
  return {
    todos: state.todos
  }
}

export default connect(mapStateToProps)(Home);