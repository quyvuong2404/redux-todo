import { browserHistory } from 'react-router';

import * as types from '../constants/UserTypes';

function forwardTo(location){
	browserHistory.push(location);
}

export function fbLogin(data){
	return (dispatch) => {
		var body = `email=${data.email}&name=${data.name}&type=facebook`;
		fetch('/api/user', {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: body
		}).then(response => response.json().then((result) => {
			if (response.ok) {
				if (result.error) {
					dispatch(fbLoginSuccess(null));
				} else {
					dispatch(fbLoginSuccess(result));
					forwardTo("/");
				}				
			}
		}));
	}
}

export function fbLoginSuccess(data){
	return {
		type: types.FB_LOGIN_SUCCESS,
		data
	};
}

export function fbLogout(){
	return {
		type: types.FB_LOGOUT
	};
}

export function gLogin(data){
	return (dispatch) => {
		var body = `email=${data.email}&name=${data.name}&type=google`;
		fetch('/api/user', {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: body
		}).then(response => response.json().then((result) => {
			if (response.ok) {
				if (result.error) {
					dispatch(gLoginSuccess(null));
				} else {
					dispatch(gLoginSuccess(result));
				}				
			}
		}));
	}
}

export function gLoginSuccess(data){
	return {
		type: types.G_LOGIN_SUCCESS,
		data
	}
}

export function gLogout(){
	return {
		type: types.G_LOGOUT
	};
}

export function twitterLogin(data){
	return (dispatch) => {
		var body = `email=${data.email}&name=${data.name}&type=twitter`;
		fetch('/api/user', {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: body
		}).then(response => response.json().then((result) => {
			if (response.ok) {console.log(result);
				if (result.error) {
					dispatch(twitterLoginSuccess(null));
				} else {
					dispatch(twitterLoginSuccess(result));
				}				
			}
		}));
	}
}

export function twitterLoginSuccess(data){
	return {
		type: types.TWITTER_LOGIN_SUCCESS,
		data
	};
}

export function twitterLogout(){
	return {
		type: types.TWITTER_LOGOUT
	};
}