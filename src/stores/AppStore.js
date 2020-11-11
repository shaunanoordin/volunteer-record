import { flow, types } from 'mobx-state-tree'
import { AuthStore } from './AuthStore'

const AppStore = types.model('AppStore', {
  initialised: types.optional(types.boolean, false),
  auth: types.optional(AuthStore, () => AuthStore.create({})),
}).actions(self => {
  const initialise = flow (function * initialise() {
    yield self.auth.checkCurrent()
    self.initialised = true
  })

  return {
    initialise
  }
})

export { AppStore }
