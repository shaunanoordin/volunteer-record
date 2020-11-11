import React from 'react'
import { Box, Button, } from 'grommet'
import { observer } from 'mobx-react'

import AppContext from 'stores'

function HomePage () {
  const store = React.useContext(AppContext)
  console.log(store)
  
  return (
    <Box>
      ...
      <Button
        label='Login'
        onClick={store.auth.login}
      />
    </Box>
  )
}

export { HomePage }
export default observer(HomePage)
