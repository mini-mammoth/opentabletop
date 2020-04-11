import { Stage, Text } from '@inlet/react-pixi'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect } from 'react'
import { useMeasure } from 'react-use'

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    width: '100%',
    height: '100%',
    minHeight: 300,
    minWidth: 200,
    overflow: 'hidden',
  },
  stage: {
    position: 'absolute',
    overflow: 'hidden',
  },
}))

const stageOptions = {
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio,
}

let app

function Map() {
  if (!window) {
    return <div>{'This component only works in the browser'}</div>
  }

  const { root, stage } = useStyles()
  const [ref, { width, height }] = useMeasure()

  useEffect(() => {
    app?.renderer.resize(width, height)
  }, [width, height])

  return (
    <div ref={ref} className={root}>
      <Stage
        className={stage}
        options={stageOptions}
        onMount={(newApp) => (app = newApp)}
      >
        <Text x={30} y={90} text="Test text" />
      </Stage>
    </div>
  )
}

export default Map
