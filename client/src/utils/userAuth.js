export default {
	isUserSignedIn() {
		return window.localStorage.getItem('user_id') > -1;
	}
}

