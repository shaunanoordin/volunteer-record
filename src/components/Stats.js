import React from 'react'
import { Box, Heading, Text } from 'grommet'
import { observer } from 'mobx-react'
import apiClient from 'panoptes-client/lib/api-client'

import AppContext from 'stores'

const ITEMS_PER_PAGE = 20  // Panoptes default

function Stats () {
  const store = React.useContext(AppContext)
  
  const [projPrefs, setProjPrefs] = React.useState([])
  
  function fetchProjPrefs (page = 1, results = []) {
    apiClient.get('/project_preferences', { page, page_size: ITEMS_PER_PAGE })
    .then(items => {
      
      const updatedResults = [...results, ...items]
      if (items.length >= ITEMS_PER_PAGE) {
        fetchProjPrefs(page + 1, updatedResults)
      } else {
        finishFetch(updatedResults)
      }
    })
    .catch(err => {
      console.error(err)
    })
  }
  
  function finishFetch (results) {
    console.log('+++ FINISHED')
    setProjPrefs(results)
  }
  
  React.useEffect(() => {
    console.log('+++ INITIATE')
    fetchProjPrefs()
  }, [store])
  
  if (!store.auth.user) return null
  
  return (
    <Box>
      <Heading use='h2'>Stats</Heading>
      <Box>
        <Text>Projects participated in: {projPrefs.length}</Text>
      </Box>
    </Box>
  )
}

export { Stats }
export default observer(Stats)
