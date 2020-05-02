import { Stage as PixiStage } from '@inlet/react-pixi'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useRef } from 'react'
import { useMeasure } from 'react-use'
import Controls from './stage/Controls'

const useStyles = makeStyles(
  () => ({
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
  }),
  { name: 'Stage' },
)

const stageOptions = {
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio,
}

function Stage() {
  const { root, stage } = useStyles()
  const [ref, { width, height }] = useMeasure()
  const app = useRef(null)

  useEffect(() => {
    app.current?.renderer.resize(width, height)
  }, [width, height])

  return (
    <div ref={ref} className={root}>
      <PixiStage
        className={stage}
        options={stageOptions}
        onMount={(newApp) => (app.current = newApp)}
      >
        <Controls x={30} y={30} />
      </PixiStage>
    </div>
  )
}

function SafeStage(props) {
  if (!window) {
    return <div>{'This component only works in the browser'}</div>
  }

  return <Stage {...props} />
}

export default SafeStage
