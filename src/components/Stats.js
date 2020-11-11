import React from 'react'
import { Box } from 'grommet'
import { observer } from 'mobx-react'
import apiClient from 'panoptes-client/lib/api-client'

import AppContext from 'stores'

function Stats () {
  const store = React.useContext(AppContext)
  
  React.useEffect(() => {
    apiClient.get('/project_preferences', {}).then(projectPreferences => {
    
      console.log('+++ project_preferences', projectPreferences)
    })
    
    
  }, [store])
  
  if (!store.auth.user) return null
  
  return (
    <Box>
      STATS
    </Box>
  )
}

export { Stats }
export default observer(Stats)
