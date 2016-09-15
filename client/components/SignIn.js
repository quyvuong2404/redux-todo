import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

import { fbLogin, gLogin, twitterLogin } from '../actions/User';

class SignIn extends Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));

		window.fbAsyncInit = function() {
		    FB.init({
		      appId      : '100700043721249',
		      xfbml      : true,
		      version    : 'v2.7'
		    });
		    // FB.getLoginStatus(function(response){
		    // 	console.log(response);
		    // });
		}
	}

	facebookLogin(){
		var { dispatch } = this.props;
		FB.login(function(response){
			FB.api('/me', { fields: 'id,name,email' }, function(response){
				dispatch(fbLogin(response));
			});
		}, { scope: 'public_profile,email'});
	}

	googleLogin(){}

	twitterLogin(){}

	render(){
		console.log(this.props.user);
		return(
			<header className="header">
				<Helmet
					title="Signin - Todo"
				/>
				<Link to="/" style={{display: "block"}}><h1>todos</h1></Link>
				<div style={{textAlign: "center"}}>
					<button className="waves-effect waves-light btn" onClick={this.googleLogin.bind(this)}>google</button>
					<button className="waves-effect waves-light btn blue darken-4" 
							onClick={this.facebookLogin.bind(this)}>facebook</button>
					<button className="waves-effect waves-light btn blue lighten-4" onClick={this.twitterLogin.bind(this)}>twitter</button>
				</div>
			</header>
		);
	}
}

SignIn.propTypes = {
	user: PropTypes.object.isRequired
}

export default SignIn;