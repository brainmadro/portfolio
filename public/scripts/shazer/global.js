import Auth from '../modules/auth.js'

const auth = new Auth();
auth.listenLinkAccountOptions();
auth.logInWithOwenCredentials();
auth.signInWithOwenCredentials();
auth.signInWithGoogle();
auth.forgotPassword();




  