import { Stage, Text } from '@inlet/react-pixi'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

let width = 500

const useStyles = makeStyles(() => ({
  root: {
    width,
  },
}))

function Map() {
  const { root } = useStyles()

  return (
    <Stage
      options={{
        backgroundColor: 0x1099bb,
        width,
      }}
      className={root}
    >
      <Text x={30} y={90} text="Test text" />
    </Stage>
  )
}

export default Map
