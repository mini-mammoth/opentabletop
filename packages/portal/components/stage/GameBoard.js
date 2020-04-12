import { Container, Sprite } from '@inlet/react-pixi'
import React from 'react'
import { getRatio } from '../../utils/imageInfo'
import Grid from './components/Grid'

function GameBoard(props) {
  const { map, mapHeight } = props
  const mapRatio = 1.4 //await getRatio(map)
  const mapWidth = mapHeight * mapRatio

  const gridWidth = mapWidth * 3
  const gridHeight = mapHeight * 3

  console.log('GameBoard', { mapHeight, mapWidth, gridHeight, gridWidth, mapRatio })

  return (
    <Container {...props} name={'GameBoard'}>
      <Sprite image={map}
              x={mapWidth}
              y={mapHeight}
              height={mapHeight}
              width={mapWidth}/>
      <Grid size={30}
            name={'Grid'}
            height={gridHeight}
            width={gridWidth}/>
    </Container>
  )
}

GameBoard.defaultProps = {
  mapHeight: 1000,
}

export default GameBoard
