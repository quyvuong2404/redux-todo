import { 
	FB_LOGIN_SUCCESS, 
	FB_LOGOUT, 
	G_LOGIN_SUCCESS, 
	G_LOGOUT, 
	TWITTER_LOGIN_SUCCESS, 
	TWITTER_LOGOUT 
} from '../constants/UserTypes';

const initialState = {
	isLoggedIn: !!localStorage.getItem('todo_token'),
	token: localStorage.getItem('todo_token'),
	profile: null
};

export default function user(state = initialState, action){
	switch(action.type){
		case FB_LOGIN_SUCCESS:
			if (action.data == null) {
				return {
					...state,
					isLoggedIn: false,
					token: null,
					profile: null
				};
			} else {
				localStorage.setItem('todo_token', action.data.token);
				return {
					...state,
					isLoggedIn: true,
					token: action.data.token,
					profile: action.data.profile
				};
			}

		case FB_LOGOUT:
			localStorage.removeItem('todo_token');
			return {
				...state,
				isLoggedIn: false,
				token: null,
				profile: null
			};

		case G_LOGIN_SUCCESS:
			return state;

		case G_LOGOUT:
			localStorage.removeItem('todo_token');
			return {
				...state,
				isLoggedIn: false,
				token: null,
				profile: null
			};

		case TWITTER_LOGIN_SUCCESS:
			return state;

		case TWITTER_LOGOUT:
			localStorage.removeItem('todo_token');
			return {
				...state,
				isLoggedIn: false,
				token: null,
				profile: null
			};

		default:
			return state;
	}
}