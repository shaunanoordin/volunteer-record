import React from 'react'
import './App.css'

import { Router, Route } from 'react-router-dom'
import { Grommet } from 'grommet'
import { observer } from 'mobx-react'
import apiClient from 'panoptes-client/lib/api-client'
import auth from 'panoptes-client/lib/auth'

import { mergedTheme } from './theme'
import AppContext from './stores'
import history from './history'

import MainLayout from './pages/MainLayout'

function App() {
  const store = React.useContext(AppContext)

  React.useEffect(() => {
    store.initialise()
  }, [store])

  if (!store.initialised) return null;

  return (
    <Router history={history}>
      <main>
        <Grommet theme={mergedTheme}>
          <MainLayout>
            ...
          </MainLayout>
        </Grommet>
      </main>
    </Router>
  );
}

export { App }
export default observer(App)
