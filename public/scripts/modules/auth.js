import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, signOut, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";
import { app, firebaseApp } from '../../config/firebase-config.js'

const auth = getAuth();
const ui = new firebaseui.auth.AuthUI(firebaseApp.auth());

export default class Auth {
    constructor(){
        this.getViewModel();
    }
  
    getViewModel(){
        return {
            $loginForm: $('.login-form'),
            loginForm: {
                $email: $('.login-form').find("input[name='email']"),
                $password: $('.login-form').find("input[name='password']"),
                $submit: $('.login-form').find("button[type='submit']"),
                $createAccount: $('.login-form').find("#create-account"),
                $loginMessage: $('.login-message')
            },
            $signinForm: $('.signin-form'),
            signinForm: {
                $email: $('.signin-form').find("input[name='email']"),
                $passwordone: $('.signin-form').find("input[name='passwordone']"),
                $passwordtwo: $('.signin-form').find("input[name='passwordtwo']"),
                $submit: $('.signin-form').find("button[type='submit']"),
                $login: $('.signin-form').find("#login"),
                $signinMessage: $('.signin-message')
            },
            $resetPassForm:$('.form-reset-password'),
            resetPassForm: {
                $passwordResetEmail: $('#password-reset-email'),
                $passwordResetButton: $('#password-reset-button'),
                $passwordResetMessage: $('.password-reset-message'),
                $back: $('.form-reset-password').find("#back"),
            },
            $forgotPassword: $('.forgot-password')
            
        }
    }
    
    logInWithOwenCredentials() {
        const viewModel = this.getViewModel();
        const $email = viewModel.loginForm.$email;
        const $password = viewModel.loginForm.$password;
        const $submit = viewModel.loginForm.$submit;
        const $loginMessage = viewModel.loginForm.$loginMessage;
        
        $submit.on('click', event => {
            event.preventDefault();
            if (validateEmail($email.val())) {
                signInWithEmailAndPassword(auth, $email.val(), $password.val())
                .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                    fetch('/shazer/login', {
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                        mode: 'same-origin', // no-cors, *cors, same-origin
                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: 'same-origin', // include, *same-origin, omit
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        redirect: 'follow', // manual, *follow, error
                        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                        body: JSON.stringify({ user:user }) // body data type must match "Content-Type" header
                    })
                    .then(response => {
                        if (response.redirected) {
                            location.reload();
                        } else {
                        console.error("Error redirigiendo a Dashboard");
                        } 
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    switch (errorCode) {
                        case 'auth/user-not-found':
                            $loginMessage.html('Parece que aun no has creado una cuenta, crea una, es rápido');
                            break;
                        case 'auth/wrong-password':
                            $loginMessage.html('La contraseña es incorrecta');    
                        default:
                            console.error(errorMessage);
                            break;
                    }
                    $loginMessage.css('display', 'flex');
                    $loginMessage.css('opacity', '1');
                    setTimeout(() => { $loginMessage.css('opacity', '0') }, 2000);
                    setTimeout(() => { $loginMessage.css('display', 'none') }, 3000);
                });    
            } else {                
                $loginMessage.html('Verifica que el correo esté escrito correctamente');
                $loginMessage.css('display', 'flex');
                $loginMessage.css('opacity', '1');
                setTimeout(() => { $loginMessage.css('opacity', '0') }, 2000);
                setTimeout(() => { $loginMessage.css('display', 'none') }, 3000);
            }                       
        })
    }    

    signInWithGoogle() {
        const viewModel = this.getViewModel();
        const $firebaseuiAuthContainer = viewModel.$firebaseuiAuthContainers;
        var uiConfig = {
            callbacks: {
              signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                fetch('/shazer/login', {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'same-origin', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    redirect: 'follow', // manual, *follow, error
                    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify({ user:authResult }) // body data type must match "Content-Type" header
                })
                return true;
              },
              uiShown: function() {
                // The widget is rendered.
                // Hide the loader.
                document.getElementById('loader').style.display = 'none';
              }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            signInSuccessUrl: '/shazer/dashboard',
            signInOptions: [
              // Leave the lines as is for the providers you want to offer your users.
              firebase.auth.GoogleAuthProvider.PROVIDER_ID
            ],
            // Terms of service url.
            tosUrl: '<your-tos-url>',
            // Privacy policy url.
            privacyPolicyUrl: '<your-privacy-policy-url>'
        };

        ui.start('#firebaseui-auth-container', uiConfig);
        

    }

    signInWithOwenCredentials() {
        const viewModel = this.getViewModel();
        const $email = viewModel.signinForm.$email;
        const $passwordone = viewModel.signinForm.$passwordone;
        const $passwordtwo = viewModel.signinForm.$passwordtwo;
        const $submit = viewModel.signinForm.$submit;
        const $signinMessage = viewModel.signinForm.$signinMessage;
        
        $submit.on('click', event => {
            event.preventDefault();
            if (!validateEmail($email.val())) {
                $signinMessage.html('Correo invalido');
                $signinMessage.css('display', 'flex');
                $signinMessage.css('opacity', '1');
                setTimeout(() => { $signinMessage.css('opacity', '0') }, 2000);
                setTimeout(() => { $signinMessage.css('display', 'none') }, 3000);
            } else if ($passwordone.val() != $passwordtwo.val()) {
                $signinMessage.html('Las contraseñas no son iguales');
                $signinMessage.css('display', 'flex');
                $signinMessage.css('opacity', '1');
                setTimeout(() => { $signinMessage.css('opacity', '0') }, 2000);
                setTimeout(() => { $signinMessage.css('display', 'none') }, 3000);
            } else {
                createUserWithEmailAndPassword(auth,  $email.val(), $passwordone.val())
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    fetch('/shazer/login', {
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                        mode: 'same-origin', // no-cors, *cors, same-origin
                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: 'same-origin', // include, *same-origin, omit
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        redirect: 'follow', // manual, *follow, error
                        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                        body: JSON.stringify({ user:user }) // body data type must match "Content-Type" header
                    })
                    .then(response => {
                        if (response.redirected) {
                            location.reload();
                        } else {
                        console.error("Error redirigiendo a Dashboard");
                        } 
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    
                    switch (errorCode) {
                        case 'auth/weak-password':
                            $signinMessage.html('La contraseña es muy débil');
                            break;
                        case 'auth/email-already-in-use':
                            $signinMessage.html('Este correo ya está asociado a una cuenta');
                            break;
                        default:
                            console.error(errorMessage);
                            break;
                    }
                    $signinMessage.css('display', 'flex');
                    $signinMessage.css('opacity', '1');
                    setTimeout(() => { $signinMessage.css('opacity', '0') }, 2000);
                    setTimeout(() => { $signinMessage.css('display', 'none') }, 3000);
                });
            }
        })
    }

    logout() {
        signOut(auth).then(() => {
            // Sign-out successful.
            fetch('/shazer/logout', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'same-origin', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                
            })
            .then(response => {
                if (response.redirected) {
                    location.reload();
                } else {
                console.error("Error redirigiendo a Dashboard");
                } 
            });
          }).catch((error) => {
            // An error happened.
        });
    }

    forgotPassword() {
        const viewModel = this.getViewModel();
        const $passwordResetEmail = viewModel.resetPassForm.$passwordResetEmail;
        const $passwordResetButton = viewModel.resetPassForm.$passwordResetButton;
        const $passwordResetMessage = viewModel.resetPassForm.$passwordResetMessage;

        $passwordResetButton.on('click', event => {
            let email = $passwordResetEmail.val();
            $passwordResetEmail.val('');
            if (validateEmail(email)) {
                $passwordResetMessage.html('Si existe una cuenta con este correo, te llegarán las instrucciones para reestablecer tu contraseña');
                $passwordResetMessage.css('display', 'flex');
                $passwordResetMessage.css('opacity', '1');
                setTimeout(() => { $passwordResetMessage.css('opacity', '0') }, 3000);
                setTimeout(() => { $passwordResetMessage.css('display', 'none') }, 4000);
                sendPasswordResetEmail(auth, email)
                .then(() => {
                    // Password reset email sent!
                    // ..
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });                   
            } else {                
                $passwordResetMessage.html('Verifica que el correo esté escrito correctamente');
                $passwordResetMessage.css('display', 'flex');
                $passwordResetMessage.css('opacity', '1');
                setTimeout(() => { $passwordResetMessage.css('opacity', '0') }, 2000);
                setTimeout(() => { $passwordResetMessage.css('display', 'none') }, 3000);
            }   
        })
        
    }

    listenLinkAccountOptions() {
        const viewModel = this.getViewModel();
        const $loginForm = viewModel.$loginForm;
        const $signinForm = viewModel.$signinForm;
        const $resetPassForm = viewModel.$resetPassForm;
        const $forgotPassword = viewModel.$forgotPassword;
        const $createAccount = viewModel.loginForm.$createAccount;
        const $login = viewModel.signinForm.$login;
        const $back = viewModel.resetPassForm.$back;

        $createAccount.on('click', event => {
            event.preventDefault();
            $loginForm.css('display', 'none');
            $signinForm.css('display', 'flex');
            $resetPassForm.css('display', 'none');
        })

        $login.on('click', event => {
            event.preventDefault();
            $loginForm.css('display', 'flex');
            $signinForm.css('display', 'none');
            $resetPassForm.css('display', 'none');
        })

        $forgotPassword.each(index => {
            $forgotPassword.get(index).addEventListener('click', event => {
                event.preventDefault();
                $loginForm.css('display', 'none');
                $signinForm.css('display', 'none');
                $resetPassForm.css('display', 'flex');
            })
        })

        $back.on('click', event => {
            event.preventDefault();
            $loginForm.css('display', 'flex');
            $signinForm.css('display', 'none');
            $resetPassForm.css('display', 'none');
        })
    }
}

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export { getAuth, onAuthStateChanged, signOut };