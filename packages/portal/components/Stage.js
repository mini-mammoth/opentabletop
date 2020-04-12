import { Stage as PixiStage } from '@inlet/react-pixi'
import { makeStyles } from '@material-ui/core/styles'
import * as PIXI from 'pixi.js'
import React, { useEffect, useRef } from 'react'
import { useMeasure } from 'react-use'

import map from '../public/assets/demo-map.png'
import { parseHex } from '../utils/parser'
import Controls from './stage/Controls'
import GameBoard from './stage/GameBoard'
import Viewport from './stage/Viewport'

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
  backgroundColor: parseHex('#fff'),
  resolution: 1, // window.devicePixelRatio,
  antialias: true,
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

  const onMount = newApp => {
    app.current = newApp

    // make PIXI global to the Pixi Inspector plugin can inspect the scene
    // https://github.com/bfanger/pixi-inspector
    window.PIXI = PIXI
  }

  const screen = {
    width,
    height,
  }

  const mapHeight = 1000

  const world = {
    height: mapHeight,
    width: mapHeight * 1.4, // TODO should use map ratio
  }

  return (
    <div ref={ref} className={root}>
      <PixiStage
        className={stage}
        options={stageOptions}
        onMount={onMount}
      >
        <Viewport mapHeight={mapHeight}
                  screen={screen}
                  world={world}>
          <GameBoard map={map}
                     mapHeight={mapHeight}/>
        </Viewport>
        <Controls x={30} y={30}/>
      </PixiStage>
    </div>
  )
}

export default Stage
