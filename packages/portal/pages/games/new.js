import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import FormHelperText from '@material-ui/core/FormHelperText'
import Router from 'next/router'
import React, { useState } from 'react'

import Layout from '../../components/Layout'
import { post } from '../../utils/fetcher'

/**
 *
 */
function NewGame() {
  const [name, setName] = useState('')
  const [error, setError] = useState(undefined)

  /**
   *
   */
  async function createGame() {
    setError(undefined)
    try {
      await post('/api/games', { name })
      Router.push('/')
    } catch (err) {
      setError(err)
    }
  }

  /**
   * @param event
   */
  function nameChange(event) {
    setName(event.target.value)
  }

  return (
    <Layout title="New Game">
      <h1>Create new Game</h1>
      <TextField label="Name" required value={name} onChange={nameChange} />
      {error && <FormHelperText error>{error.toString()}</FormHelperText>}
      <Button onClick={createGame}>Create</Button>
    </Layout>
  )
}

export default NewGame
