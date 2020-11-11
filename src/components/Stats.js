import React from 'react'
import { Anchor, Box, Heading, Table, TableBody, TableCell as TC, TableHeader, TableRow as TR, Text } from 'grommet'
import { observer } from 'mobx-react'
import apiClient from 'panoptes-client/lib/api-client'

import AppContext from 'stores'

const ITEMS_PER_PAGE = 20  // Panoptes default
const ESTIMATED_CLASSIFICATIONS_PER_HOUR = 50

function Stats () {
  const store = React.useContext(AppContext)
  
  const [projPrefs, setProjPrefs] = React.useState([])
  const [stats, setStats] = React.useState({})
  
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
    console.log(results)
    
    const totalClassifications = results.reduce((total, pref) => (
      total + (parseInt(pref.activity_count) || 0)
    ), 0)
    
    const totalHours = totalClassifications / ESTIMATED_CLASSIFICATIONS_PER_HOUR
    
    setProjPrefs(results)
    setStats({
      totalClassifications,
      totalHours,
    })
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
        <Text size='large'>
          Projects participated in: <b>{projPrefs.length}</b>
        </Text>
        <Text size='large'>
          Total Classifications: <b>{stats.totalClassifications}</b>
        </Text>
        <Text size='large'>
          Estimated Time Spent: <b>{stats.totalHours}</b> hours (assuming an average of {ESTIMATED_CLASSIFICATIONS_PER_HOUR} classifications per hour)
        </Text>
        <Text>
          See the <Anchor href='https://blog.zooniverse.org/2020/03/26/fulfilling-service-hour-requirements-through-zooniverse/' target='blank'>Zooniverse blog</Anchor> for more details.
        </Text>
      </Box>
      <Table size='xsmall'>
        <TableHeader>
          <TR>
            <TC>Project ID</TC>
            <TC>Classifications</TC>
            <TC>Most Recent Participation</TC>
          </TR>
        </TableHeader>
        <TableBody>
          {projPrefs.map(pref => (
            <TR>
              <TC>{pref.id}</TC>
              <TC>{pref.activity_count}</TC>
              <TC>{pref.updated_at}</TC>
            </TR>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export { Stats }
export default observer(Stats)
