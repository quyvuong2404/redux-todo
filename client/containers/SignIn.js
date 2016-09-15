import React, { Component } from 'react';
import { connect } from 'react-redux';

import _SignIn from '../components/SignIn';

class SignIn extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<_SignIn {...this.props} />
		);
	}
}

function mapStateToProps(state){
	return {
		user: state.user
	};
}

export default connect(mapStateToProps)(SignIn);