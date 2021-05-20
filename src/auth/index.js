import Vue from "vue";
import createAuth0Client from "@auth0/auth0-spa-js";

/** Define a default action to perform after authentication */
const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

let instance;

/** Returns the current instance of the SDK */
export const getInstance = () => instance;

/** Creates an instance of the Auth0 SDK. If one has already been created, it returns that instance */
export const useAuth0 = ({
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  redirectUri = window.location.origin,
  ...options
}) => {
  if (instance) return instance;

  // The 'instance' is simply a Vue object
  instance = new Vue({
    data() {
      return {
        loading: true,
        isAuthenticated: false,
        user: {},
        auth0Client: null,
        popupOpen: false,
        error: null
      };
    },
    methods: {
      /** Authenticates the user using a popup window */
      loginWithPopup(options, config) {
        this.popupOpen = true;

        try {
          this.auth0Client.loginWithPopup(options, config).then(() => {
            this.auth0Client.getUser().then((user) => {
              this.user = user;
              this.auth0Client.isAuthenticated().then((client) => {
                this.isAuthenticated = client;
                this.error = null;
                this.popupOpen = false;
              });
            }).error((e) => {
              this.error = e;
              // eslint-disable-next-line
              console.error(e);
              this.popupOpen = false;
            });
          }).error((e) => {
            this.error = e;
            // eslint-disable-next-line
            console.error(e);
            this.popupOpen = false;
          });
        } catch (e) {
          this.error = e;
          // eslint-disable-next-line
          console.error(e);
          this.popupOpen = false;
        } 
      },
      /** Handles the callback when logging in using a redirect */
      handleRedirectCallback() {
        this.loading = true;
        try {
          this.auth0Client.handleRedirectCallback().then(() => {
            this.auth0Client.getUser().then((user) => {
              this.user = user;
              this.isAuthenticated = true;
              this.error = null;
              this.loading = false;
            })
          }).error((e) => {
            this.error = e;
            this.loading = false;
          })
        } catch (e) {
          this.error = e;
          this.loading = false;
        }
      },
      /** Authenticates the user using the redirect method */
      loginWithRedirect(o) {
        return this.auth0Client.loginWithRedirect(o);
      },
      /** Returns all the claims present in the ID token */
      getIdTokenClaims(o) {
        return this.auth0Client.getIdTokenClaims(o);
      },
      /** Returns the access token. If the token is invalid or missing, a new one is retrieved */
      getTokenSilently(o) {
        return this.auth0Client.getTokenSilently(o);
      },
      /** Gets the access token using a popup window */

      getTokenWithPopup(o) {
        return this.auth0Client.getTokenWithPopup(o);
      },
      /** Logs the user out and removes their session on the authorization server */
      logout(o) {
        return this.auth0Client.logout(o);
      }
    },
    /** Use this lifecycle method to instantiate the SDK client */
    created() {
      // Create a new instance of the SDK client using members of the given options object
      createAuth0Client({
        ...options,
        client_id: options.clientId,
        redirect_uri: redirectUri
      }).then((client) => {
        this.auth0Client = client;

        try {
          // If the user is returning to the app after authentication..
          if (
            window.location.search.includes("code=") &&
            window.location.search.includes("state=")
          ) {
            // handle the redirect and retrieve tokens
            this.auth0Client.handleRedirectCallback().then((state) => {

              const { appState } = state;
  
              this.error = null;
    
              // Notify subscribers that the redirect callback has happened, passing the appState
              // (useful for retrieving any pre-authentication state)
              onRedirectCallback(appState);
  
              // Initialize our internal authentication state
              this.auth0Client.isAuthenticated().then((isAuth) => {
                this.isAuthenticated = isAuth;
                this.auth0Client.getUser().then((user) => {
                  this.user = user;
                  this.loading = false;
                })
              })
            })
          }
          else {
            // Initialize our internal authentication state
            this.auth0Client.isAuthenticated().then((isAuth) => {
              this.isAuthenticated = isAuth;
              this.auth0Client.getUser().then((user) => {
                this.user = user;
                this.loading = false;
              })
            })
          }
        } catch (e) {
          this.error = e;
          // Initialize our internal authentication state
          this.auth0Client.isAuthenticated().then((isAuth) => {
            this.isAuthenticated = isAuth;
            this.auth0Client.getUser().then((user) => {
              this.user = user;
              this.loading = false;
            })
          })
        }
      })
    }
  });

  return instance;
};

// Create a simple Vue plugin to expose the wrapper object throughout the application
export const Auth0Plugin = {
  install(Vue, options) {
    Vue.prototype.$auth = useAuth0(options);
  }
};