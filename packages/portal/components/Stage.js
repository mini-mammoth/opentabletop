import { Stage as PixiStage } from '@inlet/react-pixi'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useRef } from 'react'
import { useMeasure } from 'react-use'
import { parseHex } from '../utils/parser'
import Controls from './stage/Controls'
import GameBoard from './stage/GameBoard'
import ViewContainer from './stage/ViewContainer'

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
  backgroundColor: parseHex('#1099bb'),
  resolution: window.devicePixelRatio,
}

function Stage() {
  if (!window) {
    return <div>{'This component only works in the browser'}</div>
  }

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
        <ViewContainer>
          <GameBoard/>
        </ViewContainer>
        <Controls x={30} y={30}/>
      </PixiStage>
    </div>
  )
}

export default Stage
