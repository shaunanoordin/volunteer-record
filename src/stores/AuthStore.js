import { flow, /*getRoot,*/ types, } from 'mobx-state-tree'
// import auth from 'panoptes-client/lib/auth'
import oauth from 'panoptes-client/lib/oauth'
// import history from 'history'

const AuthStore = types.model('AuthStore', {
  user: types.optional(types.frozen({}), null),
  error: types.optional(types.string, '')
}).actions(self => ({
  checkCurrent: flow(function* checkCurrent () {
    try {
      const user = yield oauth.checkCurrent()
      if (user) {
        self.user = user
        // yield auth.checkBearerToken().then(token => getRoot(self).client.setBearerToken(token));
      }
    } catch (err) {
      console.error(err);
    }
  }),
  
  login: function login () {
    // Returns a login page URL for the user to navigate to.
    oauth.signIn(computeRedirectURL(window))
  },

})).views(self => ({
  get userName () {
    return self.user && self.user.display_name
  }
}))

const computeRedirectURL = (window) => {
  const { location } = window
  return location.origin ||
    `${location.protocol}//${location.hostname}:${location.port}`
}

export { AuthStore }
