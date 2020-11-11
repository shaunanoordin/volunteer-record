import React from 'react'
import { Box, Button, Text, } from 'grommet'
import { observer } from 'mobx-react'

import AppContext from 'stores'

function HomePage () {
  const store = React.useContext(AppContext)
  
  return (
    <Box>
      <Box
        direction='row'
      >
        {!store.auth.user && (
          <>
            <Text>Not logged in</Text>
            <Button
              label='Login'
              onClick={store.auth.login}
            />
          </>
        )}
        {store.auth.user && (
          <>
            <Text>{store.auth.userName}</Text>
            <Button
              label='Logout'
              onClick={store.auth.logout}
            />
          </>
        )}
      </Box>
    </Box>
  )
}

export { HomePage }
export default observer(HomePage)
